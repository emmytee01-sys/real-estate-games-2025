const nodemailer = require('nodemailer');

// Create transporter with fallback options
let transporter;

if (process.env.EMAIL_SERVICE === 'gmail') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  // Try Outlook with modern settings
  transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
}

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
          <p>If you have any questions, please contact us at realestategames2025@gmail.com</p>
        </div>
      </div>
    `
  }),
  
  paymentConfirmation: (data) => ({
    subject: 'Payment Confirmed - Real Estate Games 2025',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4ade80, #22c55e); padding: 20px; text-align: center; color: white;">
          <h1>✅ Payment Confirmed</h1>
          <p>Real Estate Games 2025</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>Hello ${data.contactPerson.name},</h2>
          <p>Great news! Your payment for the Real Estate Games 2025 has been <strong>confirmed and approved</strong>.</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border: 2px solid #4ade80;">
            <h3>📋 Confirmed Payment Details:</h3>
            <p><strong>Payment Reference:</strong> ${data.paymentReference}</p>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Package:</strong> ${data.applicationPackage}</p>
            <p><strong>Amount:</strong> ₦${data.packagePrice?.toLocaleString() || 'N/A'}</p>
            <p><strong>Confirmation Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4ade80;">
            <h3>🎉 Your Registration is Complete!</h3>
            <ul>
              <li>Your team is officially registered for the event</li>
              <li>You'll receive event schedule and venue details soon</li>
              <li>Team member registration portal access will be provided</li>
              <li>Sports competition rules and guidelines will be sent</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h3>📅 Next Steps:</h3>
            <ul>
              <li>Complete team member details in the portal</li>
              <li>Review event schedule and venue information</li>
              <li>Prepare your team for the competitions</li>
              <li>Check your email for transportation details</li>
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
          <p>If you have any questions, please contact us at realestategames2025@gmail.com</p>
        </div>
      </div>
    `
  }),
  
  ticketConfirmation: (data) => ({
    subject: `🎫 Ticket Confirmed! - ${data.ticketNumber} | Real Estate Games 2025`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🎫 Ticket Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your digital access pass is ready. Please screenshot this ticket for entry.</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <!-- ATM Card Style Digital Ticket -->
          <div style="background: linear-gradient(135deg, #1e293b, #334155); padding: 25px; margin: 20px 0; border-radius: 16px; border: 2px solid #3b82f6; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 400px; margin-left: auto; margin-right: auto;">
            <!-- Card Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div style="font-size: 24px; color: #fbbf24;">🎫</div>
              <div style="text-align: right;">
                <div style="font-size: 12px; color: #94a3b8; margin-bottom: 2px;">REAL ESTATE GAMES</div>
                <div style="font-size: 10px; color: #64748b;">2025</div>
              </div>
            </div>
            
            <!-- Card Content -->
            <div style="text-align: left; margin-bottom: 20px;">
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #94a3b8; margin-bottom: 2px;">NAME</div>
                <div style="font-size: 14px; color: white; font-weight: bold;">${data.customerName}</div>
              </div>
              
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #94a3b8; margin-bottom: 2px;">EMAIL</div>
                <div style="font-size: 12px; color: #cbd5e1;">${data.customerEmail}</div>
              </div>
              
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #94a3b8; margin-bottom: 2px;">ATTENDEE TYPE</div>
                <div style="font-size: 12px; color: #cbd5e1;">Individual Attendee</div>
              </div>
              
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; color: #94a3b8; margin-bottom: 2px;">ATTENDANCE</div>
                <div style="font-size: 12px; color: #cbd5e1;">${new Date(data.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            
            <!-- QR Code Section -->
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="font-size: 10px; color: #94a3b8; margin-bottom: 5px;">QR CODE</div>
              <div style="font-size: 18px; font-weight: bold; color: #fbbf24; letter-spacing: 3px; font-family: 'Courier New', monospace;">${data.ticketNumber}</div>
            </div>
            
            <!-- Card Footer -->
            <div style="background: rgba(34, 197, 94, 0.2); padding: 10px; border-radius: 8px; border-left: 3px solid #22c55e;">
              <div style="font-size: 11px; color: #22c55e; font-weight: bold;">Present this ticket at the entrance</div>
            </div>
          </div>
          
          <!-- Event Details Section -->
          <div style="background: #eff6ff; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 15px 0; color: #1d4ed8;">📅 Event Information:</h3>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(data.eventDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${data.eventTime}</p>
            <p style="margin: 5px 0;"><strong>Venue:</strong> ${data.venue}</p>
            ${data.seatNumbers && data.seatNumbers.length > 0 ? `<p style="margin: 5px 0;"><strong>Seat Numbers:</strong> ${data.seatNumbers.join(', ')}</p>` : ''}
          </div>
          
          <!-- Instructions Section -->
          <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4ade80;">
            <h3 style="margin: 0 0 15px 0; color: #166534;">✅ Important Instructions:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Please arrive 30 minutes before the event starts</li>
              <li>Bring a valid ID for verification</li>
              <li>Dress code: Business Casual</li>
              <li>Free parking available at the venue</li>
              <li>Screenshot this ticket for easy access</li>
            </ul>
          </div>
          
          <!-- Website Link -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3001'}" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Visit Our Website
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 5px 0;">Real Estate Games 2025 - Building a collaborative, healthy, and innovative real estate ecosystem</p>
          <p style="margin: 5px 0;">If you have any questions, please contact us at realestategames2025@gmail.com</p>
        </div>
      </div>
    `
  }),
  
  ticketReminder: (data) => ({
    subject: `⏰ Event Reminder - ${data.ticketNumber} | Real Estate Games 2025`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center; color: white;">
          <h1>⏰ Event Reminder</h1>
          <p>Real Estate Games 2025</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2>Hello ${data.customerName},</h2>
          <p>This is a friendly reminder about your upcoming Real Estate Games 2025 event!</p>
          
          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #f59e0b;">
            <h3>🎫 Your Ticket:</h3>
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Ticket Type:</strong> ${data.ticketType}</p>
            <p><strong>Quantity:</strong> ${data.quantity}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3>📅 Event Details:</h3>
            <p><strong>Date:</strong> ${new Date(data.eventDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.eventTime}</p>
            <p><strong>Venue:</strong> ${data.venue}</p>
            ${data.seatNumbers && data.seatNumbers.length > 0 ? `<p><strong>Seat Numbers:</strong> ${data.seatNumbers.join(', ')}</p>` : ''}
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4ade80;">
            <h3>✅ Important Reminders:</h3>
            <ul>
              <li>Please arrive 30 minutes before the event starts</li>
              <li>Bring a valid ID for verification</li>
              <li>Dress code: Business Casual</li>
              <li>Free parking available at the venue</li>
              <li>Don't forget to bring your ticket confirmation</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3001'}" 
               style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              View Event Details
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>Real Estate Games 2025 - Building a collaborative, healthy, and innovative real estate ecosystem</p>
          <p>If you have any questions, please contact us at realestategames2025@gmail.com</p>
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

// Send ticket confirmation
const sendTicketConfirmation = async (ticket) => {
  try {
    await sendEmail(
      ticket.customerEmail,
      'ticketConfirmation',
      ticket
    );
    
    // Send admin notification for ticket booking
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'adminNotification',
        {
          companyName: `Ticket Booking - ${ticket.ticketNumber}`,
          contactPerson: {
            name: ticket.customerName,
            email: ticket.customerEmail,
            phone: ticket.customerPhone
          },
          applicationPackage: ticket.ticketType,
          packagePrice: ticket.totalAmount,
          paymentStatus: ticket.paymentStatus
        }
      );
    }
  } catch (error) {
    console.error('Failed to send ticket confirmation email:', error);
  }
};

// Send ticket reminder
const sendTicketReminder = async (ticket) => {
  try {
    await sendEmail(
      ticket.customerEmail,
      'ticketReminder',
      ticket
    );
  } catch (error) {
    console.error('Failed to send ticket reminder email:', error);
  }
};

// Send payment confirmation
const sendPaymentConfirmation = async (company) => {
  try {
    await sendEmail(
      company.contactPerson.email,
      'paymentConfirmation',
      company
    );
    
    // Send admin notification for payment confirmation
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'adminNotification',
        {
          ...company,
          companyName: `${company.companyName} (Payment Confirmed)`,
          contactPerson: {
            ...company.contactPerson,
            name: `${company.contactPerson.name} - Payment Confirmed`
          }
        }
      );
    }
  } catch (error) {
    console.error('Failed to send payment confirmation email:', error);
  }
};

module.exports = {
  sendEmail,
  sendRegistrationConfirmation,
  sendStatusUpdate,
  sendReceiptConfirmation,
  sendTicketConfirmation,
  sendTicketReminder,
  sendPaymentConfirmation
}; 