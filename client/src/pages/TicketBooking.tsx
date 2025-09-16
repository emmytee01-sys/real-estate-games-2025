import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Building, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  Ticket
} from 'lucide-react';

const TicketBookingContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 4rem;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .free-notice {
    background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
    color: var(--dark-bg);
    padding: 1rem 2rem;
    border-radius: var(--border-radius-lg);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 1rem 0;
  }
`;

const TicketBooking: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  interface TicketFormData {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    ageRange: string;
    attendeeType: string;
    otherAttendeeType: string;
    attendanceDays: string[];
    source: string;
    otherSource: string;
    comments: string;
    confirmation: boolean;
  }

  const {
    control,
    handleSubmit,
    formState: {},
    watch,
  } = useForm<TicketFormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      ageRange: '',
      attendeeType: '',
      otherAttendeeType: '',
      attendanceDays: [],
      source: '',
      otherSource: '',
      comments: '',
      confirmation: false,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare ticket data for backend
      const ticketData = {
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        ticketType: 'Standard', // Default to Standard for free tickets
        ticketPrice: 0, // Free ticket
        quantity: 1,
        eventDate: '2025-10-25', // Fixed event date
        eventTime: '9:00 AM',
        venue: 'Real Estate Games Venue',
        paymentMethod: 'free',
        specialRequests: data.comments || '',
        dietaryRestrictions: []
      };

      // Call backend API
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to book ticket');
      }

      const result = await response.json();
      setIsSuccess(true);
      toast.success('Ticket booked successfully! Check your email for confirmation.');
      
      // Store ticket data for display
      localStorage.setItem('ticketData', JSON.stringify(result.ticket));
    } catch (error) {
      console.error('Ticket booking error:', error);
      toast.error('Failed to book ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    // Get ticket data from localStorage
    const ticketDataString = localStorage.getItem('ticketData');
    const ticketData = ticketDataString ? JSON.parse(ticketDataString) : null;

    return (
      <TicketBookingContainer>
        <Container>
          <Header>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              🎉 <span className="text-green">Ticket Confirmed!</span>
            </motion.h1>
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your digital access pass is ready. Please screenshot this ticket for entry.
            </motion.p>
          </Header>

          <motion.div
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              border: '3px solid var(--primary-green)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎫</div>
              <h2 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>DIGITAL ACCESS PASS</h2>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--white)' }}>Real Estate Games 2025</div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem', 
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div>
                <div style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Name</div>
                <div style={{ color: 'var(--white)', fontWeight: '600' }}>{ticketData?.customerName || watchedValues.fullName}</div>
              </div>
              <div>
                <div style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</div>
                <div style={{ color: 'var(--white)', fontWeight: '600' }}>{ticketData?.customerEmail || watchedValues.email}</div>
              </div>
              <div>
                <div style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Attendee Type</div>
                <div style={{ color: 'var(--white)', fontWeight: '600' }}>
                  {ticketData?.ticketType || (watchedValues.attendeeType === 'Others' ? watchedValues.otherAttendeeType : watchedValues.attendeeType)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Attendance</div>
                <div style={{ color: 'var(--white)', fontWeight: '600' }}>
                  {ticketData ? new Date(ticketData.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : watchedValues.attendanceDays?.join(', ')}
                </div>
              </div>
            </div>

            <div style={{ 
              borderTop: '1px solid var(--dark-bg-tertiary)', 
              paddingTop: '1rem' 
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--dark-bg-secondary)',
                border: '2px dashed var(--gray)',
                borderRadius: 'var(--border-radius)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gray)',
                fontSize: '0.75rem'
              }}>
                QR CODE
              </div>
              <div style={{ 
                color: 'var(--primary-green)', 
                fontWeight: '600', 
                fontFamily: 'monospace' 
              }}>
                {ticketData?.ticketNumber || `REG${Date.now().toString().slice(-6)}`}
              </div>
              <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Present this ticket at the entrance
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: '2rem' }}
          >
            <button
              onClick={() => window.print()}
              style={{
                background: 'linear-gradient(135deg, var(--primary-green), var(--primary-green-dark))',
                color: 'var(--dark-bg)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: 'var(--border-radius)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              📥 Print/Save Ticket
            </button>
          </motion.div>
        </Container>
      </TicketBookingContainer>
    );
  }

  return (
    <TicketBookingContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Book Your <span className="text-green">Ticket</span>
          </motion.h1>
          <motion.div
            className="free-notice"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎉 Entry is FREE – Registration is required to attend!
          </motion.div>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            🎫 You will receive a digital access pass after confirmation.
            📝 Registration closes when venue capacity is reached.
          </motion.p>
        </Header>

        <div style={{
          background: 'var(--dark-bg)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow)'
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <User size={24} />
                Personal Information
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Full Name *
                  </label>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: 'Full name is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter your full name"
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      />
                    )}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Email Address *
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      />
                    )}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Phone Number *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter your phone number"
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      />
                    )}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Gender *
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Age Range *
                  </label>
                  <Controller
                    name="ageRange"
                    control={control}
                    rules={{ required: 'Age range is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      >
                        <option value="">Select age range</option>
                        <option value="18–25">18–25</option>
                        <option value="26–35">26–35</option>
                        <option value="36–45">36–45</option>
                        <option value="46–50">46–50</option>
                        <option value="51-55">51-55</option>
                        <option value="55-60">55-60</option>
                      </select>
                    )}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <Building size={24} />
                Are You Attending as:
              </div>
              
              {['Individual Attendee', 'Real Estate Company Staff', 'Exhibitor or Vendor', 'Press/Media', 'Volunteer or Crew', 'Others'].map((type) => (
                <label key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '0.5rem'
                }}>
                  <Controller
                    name="attendeeType"
                    control={control}
                    rules={{ required: 'Attendee type is required' }}
                    render={({ field }) => (
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                  {type}
                </label>
              ))}
              
              {watchedValues.attendeeType === 'Others' && (
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Please specify *
                  </label>
                  <Controller
                    name="otherAttendeeType"
                    control={control}
                    rules={{ required: 'Please specify attendee type' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Specify your attendee type"
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <Calendar size={24} />
                Which Day(s) Will You Attend?
              </div>
              
              {['Saturday, October 24', 'Sunday, October 25', 'Both Days'].map((day) => (
                <label key={day} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '0.5rem'
                }}>
                  <Controller
                    name="attendanceDays"
                    control={control}
                    rules={{ required: 'Please select at least one day' }}
                    render={({ field }) => (
                      <input
                        type="radio"
                        value={day}
                        checked={field.value?.includes?.(day) || false}
                        onChange={(e) => {
                          const currentValues = field.value || [];
                          if (e.target.checked) {
                            field.onChange([day]);
                          } else {
                            field.onChange(currentValues.filter((v: string) => v !== day));
                          }
                        }}
                      />
                    )}
                  />
                  {day}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <MessageSquare size={24} />
                How Did You Hear About Real Estate Games?
              </div>
              
              {['Instagram', 'WhatsApp', 'Referral', 'Flyer or Billboard', 'Other'].map((source) => (
                <label key={source} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '0.5rem'
                }}>
                  <Controller
                    name="source"
                    control={control}
                    rules={{ required: 'Source is required' }}
                    render={({ field }) => (
                      <input
                        type="radio"
                        value={source}
                        checked={field.value === source}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                  {source}
                </label>
              ))}
              
              {watchedValues.source === 'Other' && (
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontWeight: '500', color: 'var(--white)', display: 'block', marginBottom: '0.5rem' }}>
                    Please specify *
                  </label>
                  <Controller
                    name="otherSource"
                    control={control}
                    rules={{ required: 'Please specify source' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Specify how you heard about us"
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--dark-bg-tertiary)',
                          borderRadius: 'var(--border-radius)',
                          background: 'var(--dark-bg-secondary)',
                          color: 'var(--white)',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <MessageSquare size={24} />
                Optional Comments or Questions
              </div>
              
              <Controller
                name="comments"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Any suggestions or inquiries..."
                    style={{
                      padding: '0.75rem',
                      border: '1px solid var(--dark-bg-tertiary)',
                      borderRadius: 'var(--border-radius)',
                      background: 'var(--dark-bg-secondary)',
                      color: 'var(--white)',
                      fontSize: '1rem',
                      width: '100%',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                  />
                )}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-green)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <CheckCircle size={24} />
                Confirmation
              </div>
              
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: 'var(--border-radius)'
              }}>
                <Controller
                  name="confirmation"
                  control={control}
                  rules={{ required: 'You must confirm your registration' }}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                I confirm that I am registering for free entry to the Real Estate Games 2025
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, var(--primary-green), var(--primary-green-dark))',
                color: 'var(--dark-bg)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: 'var(--border-radius)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Processing...
                </>
              ) : (
                <>
                  <Ticket size={20} />
                  Submit Registration
                </>
              )}
            </button>
          </form>
        </div>
      </Container>
    </TicketBookingContainer>
  );
};

export default TicketBooking; 