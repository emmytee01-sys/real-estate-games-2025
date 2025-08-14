const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { authenticateAdmin } = require('../middleware/auth');
// const { sendStatusUpdate } = require('../services/emailService');

// Apply admin authentication to specific routes only
// router.use(authenticateAdmin); // Removed global middleware

// Get dashboard statistics
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const [
      totalRegistrations,
      pendingRegistrations,
      approvedRegistrations,
      totalParticipants,
      companyTypeStats,
      sportsStats,
      recentRegistrations
    ] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ status: 'Pending' }),
      Registration.countDocuments({ status: 'Approved' }),
      Registration.aggregate([
        { $group: { _id: null, total: { $sum: '$teamSize' } } }
      ]),
      Registration.aggregate([
        { $group: { _id: '$companyType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Registration.aggregate([
        { $unwind: '$preferredSports' },
        { $group: { _id: '$preferredSports', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Registration.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('companyName contactPerson.name status createdAt')
    ]);

    res.json({
      overview: {
        totalRegistrations,
        pendingRegistrations,
        approvedRegistrations,
        totalParticipants: totalParticipants[0]?.total || 0,
        approvalRate: totalRegistrations > 0 ? (approvedRegistrations / totalRegistrations * 100).toFixed(1) : 0
      },
      companyTypeStats,
      sportsStats,
      recentRegistrations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all registrations with advanced filtering
router.get('/registrations', authenticateAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      companyType, 
      search, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    let query = {};
    
    // Apply filters
    if (status) query.status = status;
    if (companyType) query.companyType = companyType;
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { 'contactPerson.name': { $regex: search, $options: 'i' } },
        { 'contactPerson.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const registrations = await Registration.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    
    const total = await Registration.countDocuments(query);
    
    res.json({
      registrations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: parseInt(page) * parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update registration status
router.patch('/registrations/:id/status', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected', 'Confirmed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        adminNotes: adminNotes || undefined
      },
      { new: true }
    );
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    // Send status update email
    // try {
    //   await sendStatusUpdate(registration);
    // } catch (emailError) {
    //   console.error('Failed to send status update email:', emailError);
    // }
    
    res.json({
      message: 'Status updated successfully!',
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk status update
router.patch('/registrations/bulk-status', async (req, res) => {
  try {
    const { registrationIds, status, adminNotes } = req.body;
    
    if (!Array.isArray(registrationIds) || registrationIds.length === 0) {
      return res.status(400).json({ error: 'Registration IDs are required' });
    }
    
    if (!['Pending', 'Approved', 'Rejected', 'Confirmed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const result = await Registration.updateMany(
      { _id: { $in: registrationIds } },
      { 
        status,
        adminNotes: adminNotes || undefined
      }
    );
    
    res.json({
      message: `${result.modifiedCount} registrations updated successfully!`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export registrations to CSV
router.get('/export/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    
    // Convert to CSV format
    const csvHeader = 'Company Name,Company Type,Contact Person,Email,Phone,Team Size,Preferred Sports,Status,Registration Date\n';
    const csvData = registrations.map(reg => {
      return `"${reg.companyName}","${reg.companyType}","${reg.contactPerson.name}","${reg.contactPerson.email}","${reg.contactPerson.phone}","${reg.teamSize}","${reg.preferredSports.join(', ')}","${reg.status}","${reg.createdAt.toISOString().split('T')[0]}"`;
    }).join('\n');
    
    const csv = csvHeader + csvData;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed statistics
router.get('/statistics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }
    
    const [
      monthlyStats,
      statusTrends,
      topCompanies,
      sportsParticipation
    ] = await Promise.all([
      Registration.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 },
            participants: { $sum: '$teamSize' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]),
      Registration.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: {
              status: '$status',
              date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.date': 1 } }
      ]),
      Registration.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$companyType',
            count: { $sum: 1 },
            avgTeamSize: { $avg: '$teamSize' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Registration.aggregate([
        { $match: dateFilter },
        { $unwind: '$preferredSports' },
        {
          $group: {
            _id: '$preferredSports',
            count: { $sum: 1 },
            uniqueTeams: { $addToSet: '$_id' }
          }
        },
        {
          $project: {
            sport: '$_id',
            count: 1,
            uniqueTeams: { $size: '$uniqueTeams' }
          }
        },
        { $sort: { uniqueTeams: -1 } }
      ])
    ]);
    
    res.json({
      monthlyStats,
      statusTrends,
      topCompanies,
      sportsParticipation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 