const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Outlook specific configuration
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  tls: {
    ciphers: 'SSLv3'
  }
});

// Email templates
const emailTemplates = {
  registrationConfirmation: (data) => ({
    subject: 'Registration Confirmed - Real Estate Games 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4ade80, #22c55e); padding: 20px; text-align: center; color: white;">
          <h1>🏆 Real Estate Games 2025</h1>
          <p>Registration Confirmed!</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>Hello ${data.contactPerson.name},</h2>
          <p>Thank you for registering your team for the Real Estate Games 2025!</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Registration Details:</h3>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Team Size:</strong> ${data.teamSize} members</p>
            <p><strong>Preferred Sports:</strong> ${data.preferredSports.join(', ')}</p>
            <p><strong>Registration ID:</strong> ${data._id}</p>
          </div>
          
          <p>We will contact you soon with further details about the event schedule and requirements.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" 
               style="background: #4ade80; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Visit Our Website
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>Real Estate Games 2025 - Building a collaborative, healthy, and innovative real estate ecosystem</p>
        </div>
      </div>
    `
  }),
  
  adminNotification: (data) => ({
    subject: 'New Registration - Real Estate Games 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ff6b6b; padding: 20px; text-align: center; color: white;">
          <h1>🏢 New Registration Alert</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>New Team Registration</h2>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Company Information:</h3>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Type:</strong> ${data.companyType}</p>
            <p><strong>Contact:</strong> ${data.contactPerson.name} (${data.contactPerson.email})</p>
            <p><strong>Team Size:</strong> ${data.teamSize} members</p>
            <p><strong>Sports:</strong> ${data.preferredSports.join(', ')}</p>
          </div>
          
          <p>Please review and approve this registration.</p>
        </div>
      </div>
    `
  }),
  
  statusUpdate: (data) => ({
    subject: `Registration ${data.status} - Real Estate Games 2025`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: ${data.status === 'Approved' ? '#4ade80' : '#ff6b6b'}; padding: 20px; text-align: center; color: white;">
          <h1>🏆 Registration ${data.status}</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>Hello ${data.contactPerson.name},</h2>
          <p>Your registration for Real Estate Games 2025 has been <strong>${data.status.toLowerCase()}</strong>.</p>
          
          ${data.status === 'Approved' ? `
            <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4ade80;">
              <h3>✅ Next Steps:</h3>
              <ul>
                <li>Complete team member details</li>
                <li>Submit payment (if required)</li>
                <li>Review event schedule</li>
                <li>Prepare for the games!</li>
              </ul>
            </div>
          ` : `
            <div style="background: #ffe8e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ff6b6b;">
              <p>If you have any questions, please contact our team.</p>
            </div>
          `}
        </div>
      </div>
    `
  }),
  
  receiptConfirmation: (data) => ({
    subject: 'Payment Receipt Received - Real Estate Games 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4ade80, #22c55e); padding: 20px; text-align: center; color: white;">
          <h1>💰 Payment Receipt Confirmed</h1>
          <p>Real Estate Games 2025</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>Hello ${data.contactPerson.name},</h2>
          <p>Thank you! We have successfully received your payment receipt for the Real Estate Games 2025.</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border: 2px solid #4ade80;">
            <h3>📋 Payment Details:</h3>
            <p><strong>Payment Reference:</strong> ${data.paymentReference}</p>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Package:</strong> ${data.applicationPackage}</p>
            <p><strong>Amount:</strong> ₦${data.packagePrice?.toLocaleString() || 'N/A'}</p>
            <p><strong>Receipt Upload Date:</strong> ${new Date(data.paymentReceipt.uploadDate).toLocaleDateString()}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4ade80;">
            <h3>✅ What Happens Next:</h3>
            <ul>
              <li>Our team will verify your payment within 24-48 hours</li>
              <li>You'll receive a confirmation email once verified</li>
              <li>Event details and schedule will be sent to your email</li>
              <li>Team registration portal access will be provided</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h3>📧 Important Information:</h3>
            <p>Please check your email regularly for updates about:</p>
            <ul>
              <li>Event schedule and venue details</li>
              <li>Team member registration instructions</li>
              <li>Sports competition rules and guidelines</li>
              <li>Transportation and accommodation details</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3001'}" 
               style="background: #4ade80; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Visit Our Website
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>Real Estate Games 2025 - Building a collaborative, healthy, and innovative real estate ecosystem</p>
          <p>If you have any questions, please contact us at support@realestategames.com</p>
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = emailTemplates[template](data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Send registration confirmation
const sendRegistrationConfirmation = async (registration) => {
  try {
    await sendEmail(
      registration.contactPerson.email,
      'registrationConfirmation',
      registration
    );
    
    // Send admin notification
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'adminNotification',
        registration
      );
    }
  } catch (error) {
    console.error('Failed to send registration emails:', error);
  }
};

// Send status update
const sendStatusUpdate = async (registration) => {
  try {
    await sendEmail(
      registration.contactPerson.email,
      'statusUpdate',
      registration
    );
  } catch (error) {
    console.error('Failed to send status update email:', error);
  }
};

// Send receipt confirmation
const sendReceiptConfirmation = async (registration) => {
  try {
    await sendEmail(
      registration.contactPerson.email,
      'receiptConfirmation',
      registration
    );
    
    // Send admin notification for receipt upload
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'adminNotification',
        {
          ...registration,
          companyName: `${registration.companyName} (Receipt Uploaded)`,
          contactPerson: {
            ...registration.contactPerson,
            name: `${registration.contactPerson.name} - Receipt Uploaded`
          }
        }
      );
    }
  } catch (error) {
    console.error('Failed to send receipt confirmation email:', error);
  }
};

module.exports = {
  sendEmail,
  sendRegistrationConfirmation,
  sendStatusUpdate,
  sendReceiptConfirmation
}; 