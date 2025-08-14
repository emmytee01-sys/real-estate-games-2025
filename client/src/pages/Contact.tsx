import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  User,
  Building
} from 'lucide-react';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 4rem;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    color: var(--primary-green);
    margin-bottom: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--dark-bg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    transform: translateX(5px);
  }
  
  .icon {
    width: 50px;
    height: 50px;
    background: var(--primary-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark-bg);
    flex-shrink: 0;
  }
  
  .content {
    h4 {
      color: var(--white);
      margin-bottom: 0.5rem;
    }
    
    p, a {
      color: var(--gray);
      text-decoration: none;
      transition: var(--transition);
      
      &:hover {
        color: var(--primary-green);
      }
    }
  }
`;

const ContactForm = styled.div`
  background: var(--dark-bg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  
  h3 {
    color: var(--primary-green);
    margin-bottom: 2rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
  
  label {
    font-weight: 500;
    color: var(--white);
  }
  
  .error {
    color: var(--red);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const Input = styled.input<{ $hasError: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$hasError ? 'var(--red)' : 'var(--dark-bg-tertiary)'};
  border-radius: var(--border-radius);
  background: var(--dark-bg-secondary);
  color: var(--white);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
  }
  
  &::placeholder {
    color: var(--gray-dark);
  }
`;

const TextArea = styled.textarea<{ $hasError: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$hasError ? 'var(--red)' : 'var(--dark-bg-tertiary)'};
  border-radius: var(--border-radius);
  background: var(--dark-bg-secondary);
  color: var(--white);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
  }
  
  &::placeholder {
    color: var(--gray-dark);
  }
`;

const SubmitButton = styled.button`
  background: var(--primary-green);
  color: var(--dark-bg);
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  
  &:hover {
    background: var(--primary-green-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-green);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const BankInfo = styled.div`
  background: var(--dark-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-top: 2rem;
  
  h4 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }
  
  .bank-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--gray);
    
    .detail {
      display: flex;
      justify-content: space-between;
      
      .label {
        font-weight: 500;
      }
      
      .value {
        color: var(--white);
      }
    }
  }
`;

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  company: yup.string().optional(),
  phone: yup.string().optional(),
});

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        reset();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in <span className="text-green">Touch</span>
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions about The Real Estate Games? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </motion.p>
        </Header>

        <ContactGrid>
          <ContactInfo>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Contact Information
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactItem>
                <Mail className="icon" size={24} />
                <div className="content">
                  <h4>Email</h4>
                  <a href="mailto:marygoldmedia11@gmail.com">marygoldmedia11@gmail.com</a>
                </div>
              </ContactItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ContactItem>
                <Phone className="icon" size={24} />
                <div className="content">
                  <h4>Phone</h4>
                  <a href="tel:+2348147128597">+234 814 712 8597</a>
                  <br />
                  <a href="tel:+2348122903836">+234 812 290 3836</a>
                </div>
              </ContactItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactItem>
                <MapPin className="icon" size={24} />
                <div className="content">
                  <h4>Location</h4>
                  <p>Lagos, Nigeria</p>
                </div>
              </ContactItem>
            </motion.div>

            <BankInfo>
              <h4>Bank Details</h4>
              <div className="bank-details">
                <div className="detail">
                  <span className="label">Account Number:</span>
                  <span className="value">2001999834</span>
                </div>
                <div className="detail">
                  <span className="label">Account Name:</span>
                  <span className="value">Marygold Production</span>
                </div>
                <div className="detail">
                  <span className="label">Bank:</span>
                  <span className="value">FCMB</span>
                </div>
              </div>
            </BankInfo>
          </ContactInfo>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContactForm>
              <h3>Send us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGrid>
                  <FormField>
                    <label>Full Name *</label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          $hasError={!!errors.name}
                        />
                      )}
                    />
                    {errors.name && <div className="error">{errors.name.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Email Address *</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          $hasError={!!errors.email}
                        />
                      )}
                    />
                    {errors.email && <div className="error">{errors.email.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Company</label>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter your company name"
                          $hasError={!!errors.company}
                        />
                      )}
                    />
                  </FormField>

                  <FormField>
                    <label>Phone Number</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          $hasError={!!errors.phone}
                        />
                      )}
                    />
                  </FormField>

                  <FormField className="full-width">
                    <label>Subject *</label>
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter message subject"
                          $hasError={!!errors.subject}
                        />
                      )}
                    />
                    {errors.subject && <div className="error">{errors.subject.message}</div>}
                  </FormField>

                  <FormField className="full-width">
                    <label>Message *</label>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          placeholder="Enter your message"
                          $hasError={!!errors.message}
                        />
                      )}
                    />
                    {errors.message && <div className="error">{errors.message.message}</div>}
                  </FormField>
                </FormGrid>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={20} />
                </SubmitButton>
              </form>
            </ContactForm>
          </motion.div>
        </ContactGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact; 