const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

// Generate unique payment reference
function generatePaymentReference() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REG${timestamp}${random}`;
}

// Create new registration
exports.createRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const registrationData = req.body;
      
      // Generate payment reference
      const paymentReference = generatePaymentReference();
      
      // Add payment reference and timestamps
      const registration = {
        ...registrationData,
        paymentReference,
        paymentStatus: 'pending',
        registrationDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Save to Firestore
      const docRef = await db.collection('registrations').add(registration);
      
      // Get the saved document
      const savedDoc = await docRef.get();
      
      res.status(201).json({
        message: 'Registration submitted successfully!',
        registration: {
          id: docRef.id,
          ...savedDoc.data()
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Get all registrations
exports.getRegistrations = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { page = 1, limit = 10, status, companyType, search } = req.query;
      
      let query = db.collection('registrations');
      
      // Apply filters
      if (status) {
        query = query.where('status', '==', status);
      }
      
      if (companyType) {
        query = query.where('companyType', '==', companyType);
      }
      
      // Get documents
      const snapshot = await query
        .orderBy('createdAt', 'desc')
        .limit(parseInt(limit))
        .offset((parseInt(page) - 1) * parseInt(limit))
        .get();
      
      const registrations = [];
      snapshot.forEach(doc => {
        registrations.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get total count
      const totalSnapshot = await query.get();
      const total = totalSnapshot.size;
      
      res.json({
        registrations,
        totalPages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page),
        total
      });
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Get single registration
exports.getRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { id } = req.params;
      
      const doc = await db.collection('registrations').doc(id).get();
      
      if (!doc.exists) {
        return res.status(404).json({ error: 'Registration not found' });
      }
      
      res.json({
        id: doc.id,
        ...doc.data()
      });
    } catch (error) {
      console.error('Get registration error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Upload payment receipt
exports.uploadReceipt = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { registrationId } = req.params;
      const { receiptUrl, originalName, fileSize } = req.body;
      
      // Validate registration exists
      const registrationDoc = await db.collection('registrations').doc(registrationId).get();
      
      if (!registrationDoc.exists) {
        return res.status(404).json({ error: 'Registration not found' });
      }
      
      // Update registration with receipt details
      await db.collection('registrations').doc(registrationId).update({
        paymentReceipt: {
          filename: receiptUrl,
          originalName,
          size: fileSize,
          uploadDate: admin.firestore.FieldValue.serverTimestamp()
        },
        paymentStatus: 'pending',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.json({
        message: 'Payment receipt uploaded successfully!',
        registration: {
          id: registrationId,
          paymentReceipt: {
            filename: receiptUrl,
            originalName,
            size: fileSize
          },
          paymentStatus: 'pending'
        }
      });
    } catch (error) {
      console.error('Upload receipt error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Update payment status
exports.updatePaymentStatus = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'PATCH') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { registrationId } = req.params;
      const { paymentStatus, adminNotes } = req.body;
      
      const updateData = {
        paymentStatus,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      if (paymentStatus === 'completed') {
        updateData.paymentDate = admin.firestore.FieldValue.serverTimestamp();
      }
      
      if (adminNotes) {
        updateData.adminNotes = adminNotes;
      }
      
      await db.collection('registrations').doc(registrationId).update(updateData);
      
      res.json({
        message: 'Payment status updated successfully!'
      });
    } catch (error) {
      console.error('Update payment status error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Get registration statistics
exports.getRegistrationStats = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const snapshot = await db.collection('registrations').get();
      
      let totalRegistrations = 0;
      let totalParticipants = 0;
      const statusCounts = {};
      const companyTypeCounts = {};
      
      snapshot.forEach(doc => {
        const data = doc.data();
        totalRegistrations++;
        totalParticipants += data.teamSize || 0;
        
        // Count by status
        const status = data.status || 'Pending';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
        
        // Count by company type
        const companyType = data.companyType || 'Other';
        companyTypeCounts[companyType] = (companyTypeCounts[companyType] || 0) + 1;
      });
      
      res.json({
        overview: {
          totalRegistrations,
          totalParticipants,
          averageTeamSize: totalRegistrations > 0 ? Math.round(totalParticipants / totalRegistrations) : 0
        },
        statusBreakdown: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
        companyTypeBreakdown: Object.entries(companyTypeCounts).map(([type, count]) => ({ type, count }))
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ error: error.message });
    }
  });
}); 