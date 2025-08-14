import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Building, 
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Trophy,
  Plus,
  X
} from 'lucide-react';
import PackageSelection from '../components/PackageSelection';
import BankTransferModal from '../components/BankTransferModal';

const RegistrationContainer = styled.div`
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
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--dark-bg-tertiary);
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const ProgressStep = styled.div<{ $active: boolean; $completed: boolean }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background: ${props => props.$completed ? 'var(--primary-green)' : props.$active ? 'var(--primary-green)' : 'var(--dark-bg-tertiary)'};
    color: ${props => props.$completed || props.$active ? 'var(--dark-bg)' : 'var(--gray)'};
    transition: var(--transition);
  }
  
  .step-label {
    font-size: 0.875rem;
    color: ${props => props.$active ? 'var(--primary-green)' : 'var(--gray)'};
    font-weight: 500;
  }
`;

const FormContainer = styled.div`
  background: var(--dark-bg);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  border: 1px solid rgba(0, 255, 136, 0.1);
  box-shadow: var(--shadow-lg);
`;

const FormSection = styled(motion.div)`
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    color: var(--primary-green);
    font-size: 1.25rem;
    font-weight: 600;
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

const Select = styled.select<{ $hasError: boolean }>`
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
`;

const TextArea = styled.textarea<{ $hasError: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$hasError ? 'var(--red)' : 'var(--dark-bg-tertiary)'};
  border-radius: var(--border-radius);
  background: var(--dark-bg-secondary);
  color: var(--white);
  font-size: 1rem;
  min-height: 100px;
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

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background: var(--dark-bg-secondary);
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--primary-green);
  }
`;

const TeamMembersSection = styled.div`
  .team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .add-member-btn {
    background: var(--primary-green);
    color: var(--dark-bg);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      background: var(--primary-green-light);
    }
  }
`;

const TeamMemberCard = styled.div`
  background: var(--dark-bg-secondary);
  border: 1px solid var(--dark-bg-tertiary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  
  .remove-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--red);
    color: var(--white);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      background: #ff6666;
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  
  ${props => props.$variant === 'primary' ? `
    background: var(--primary-green);
    color: var(--dark-bg);
    border: none;
    
    &:hover {
      background: var(--primary-green-light);
      transform: translateY(-2px);
      box-shadow: var(--shadow-green);
    }
  ` : `
    background: transparent;
    color: var(--white);
    border: 2px solid var(--primary-green);
    
    &:hover {
      background: var(--primary-green);
      color: var(--dark-bg);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  
  .success-icon {
    font-size: 4rem;
    color: var(--primary-green);
    margin-bottom: 1rem;
  }
  
  h2 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }
  
  .message {
    color: var(--gray);
    margin-bottom: 2rem;
  }
`;

// Form data interface
interface RegistrationFormData {
  companyName: string;
  companyType: string;
  companyAddress: string;
  companyWebsite?: string;
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  teamSize: number;
  preferredSports: (string | undefined)[];
  applicationPackage: string;
  packagePrice: number;
}

// Validation schema
const validationSchema: yup.ObjectSchema<RegistrationFormData> = yup.object({
  companyName: yup.string().required('Company name is required'),
  companyType: yup.string().required('Company type is required'),
  companyAddress: yup.string().required('Company address is required'),
  companyWebsite: yup.string().url('Please enter a valid website URL').optional(),
  contactPerson: yup.object({
    name: yup.string().required('Contact person name is required'),
    position: yup.string().required('Position is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
  }),
  teamSize: yup.number().min(5, 'Minimum team size is 5').max(20, 'Maximum team size is 20').required('Team size is required'),
  preferredSports: yup.array().of(yup.string().required()).min(1, 'Please select at least one sport').required('Preferred sports are required'),
  applicationPackage: yup.string().required('Application package is required'),
  packagePrice: yup.number().required('Package price is required'),
});

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = package selection, 1-4 = form steps
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    package: string;
    price: number;
    games: string[];
    prizes: string[];
  } | null>(null);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [showReceiptSuccess, setShowReceiptSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      companyType: '',
      companyAddress: '',
      companyWebsite: '',
      contactPerson: {
        name: '',
        position: '',
        email: '',
        phone: '',
      },
      teamSize: 5,
      preferredSports: [],
      applicationPackage: '',
      packagePrice: 0,
    },
  });

  const watchedValues = watch();

  const steps = [
    { number: 0, label: 'Package Selection' },
    { number: 1, label: 'Company Info' },
    { number: 2, label: 'Contact Person' },
    { number: 3, label: 'Team Details' },
    { number: 4, label: 'Review & Submit' },
  ];

  const companyTypes = [
    'Real Estate Developer',
    'Mortgage Company',
    'Property Tech',
    'Architecture Firm',
    'Engineering Firm',
    'Government Agency',
    'Other'
  ];

  const sports = [
    'Football',
    'Athletics',
    'Tug of War',
    'Basketball',
    'Volleyball',
    'Table Tennis'
  ];

  const handlePackageSelect = (packageData: {
    package: string;
    price: number;
    games: string[];
    prizes: string[];
  }) => {
    setSelectedPackage(packageData);
    setValue('applicationPackage', packageData.package);
    setValue('packagePrice', packageData.price);
    setCurrentStep(1);
  };

  const handleNext = async () => {
    let stepValid = false;
    
    switch (currentStep) {
      case 1:
        stepValid = await trigger(['companyName', 'companyType', 'companyAddress']);
        break;
      case 2:
        stepValid = await trigger(['contactPerson.name', 'contactPerson.position', 'contactPerson.email', 'contactPerson.phone']);
        break;
      case 3:
        stepValid = await trigger(['teamSize', 'preferredSports']);
        break;
    }

    if (stepValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReceiptUpload = async () => {
    if (!receiptFile || !registrationId) {
      toast.error('Please select a receipt file');
      return;
    }

    setIsUploadingReceipt(true);
    try {
      const formData = new FormData();
      formData.append('paymentReceipt', receiptFile);

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}/registrations/${registrationId}/receipt`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Payment receipt uploaded successfully!');
        setShowReceiptUpload(false);
        setReceiptFile(null);
        setShowReceiptSuccess(true);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload receipt');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload JPEG, PNG, GIF, or PDF files only.');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large. Please upload files smaller than 5MB.');
        return;
      }
      
      setReceiptFile(file);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('Form data being submitted:', data);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setRegistrationId(result.registration._id);
        setPaymentReference(result.registration.paymentReference);
        setShowBankTransferModal(true);
        toast.success('Registration submitted successfully! Please proceed to payment.');
      } else {
        const error = await response.json();
        console.log('Server error response:', error);
        toast.error(error.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <RegistrationContainer>
        <Container>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="success-icon">✅</div>
            <h2>Registration Successful!</h2>
            <p className="message">
              Thank you for registering for The Real Estate Games. We have received your application and will contact you soon with further details.
            </p>
            <Button $variant="primary" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </SuccessMessage>
        </Container>
      </RegistrationContainer>
    );
  }

  return (
    <RegistrationContainer>
      <Container>
        <Header>
          <h1>Team Registration</h1>
          <p className="subtitle">Join The Real Estate Games 2025</p>
        </Header>

        <ProgressBar>
          {steps.map((step) => (
            <ProgressStep
              key={step.number}
              $active={currentStep === step.number}
              $completed={currentStep > step.number}
            >
              <div className="step-number">
                {currentStep > step.number ? <CheckCircle size={20} /> : step.number}
              </div>
              <div className="step-label">{step.label}</div>
            </ProgressStep>
          ))}
        </ProgressBar>

        <FormContainer>
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <PackageSelection onPackageSelect={handlePackageSelect} />
            )}

            {currentStep === 1 && (
              <FormSection
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-title">
                  <Building size={24} />
                  Company Information
                </div>

                <FormGrid>
                  <FormField className="full-width">
                    <label>Company Name *</label>
                    <Controller
                      name="companyName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter your company name"
                          $hasError={!!errors.companyName}
                        />
                      )}
                    />
                    {errors.companyName && <div className="error">{errors.companyName.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Company Type *</label>
                    <Controller
                      name="companyType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          $hasError={!!errors.companyType}
                        >
                          <option value="">Select company type</option>
                          {companyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.companyType && <div className="error">{errors.companyType.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Company Website</label>
                    <Controller
                      name="companyWebsite"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="https://yourcompany.com"
                          $hasError={!!errors.companyWebsite}
                        />
                      )}
                    />
                    {errors.companyWebsite && <div className="error">{errors.companyWebsite.message}</div>}
                  </FormField>

                  <FormField className="full-width">
                    <label>Company Address *</label>
                    <Controller
                      name="companyAddress"
                      control={control}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          placeholder="Enter your company address"
                          $hasError={!!errors.companyAddress}
                        />
                      )}
                    />
                    {errors.companyAddress && <div className="error">{errors.companyAddress.message}</div>}
                  </FormField>
                </FormGrid>
              </FormSection>
            )}

            {currentStep === 2 && (
              <FormSection
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-title">
                  <User size={24} />
                  Contact Person Information
                </div>

                <FormGrid>
                  <FormField>
                    <label>Full Name *</label>
                    <Controller
                      name="contactPerson.name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter contact person name"
                          $hasError={!!errors.contactPerson?.name}
                        />
                      )}
                    />
                    {errors.contactPerson?.name && <div className="error">{errors.contactPerson.name.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Position *</label>
                    <Controller
                      name="contactPerson.position"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="e.g., CEO, Manager"
                          $hasError={!!errors.contactPerson?.position}
                        />
                      )}
                    />
                    {errors.contactPerson?.position && <div className="error">{errors.contactPerson.position.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Email Address *</label>
                    <Controller
                      name="contactPerson.email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="contact@company.com"
                          $hasError={!!errors.contactPerson?.email}
                        />
                      )}
                    />
                    {errors.contactPerson?.email && <div className="error">{errors.contactPerson.email.message}</div>}
                  </FormField>

                  <FormField>
                    <label>Phone Number *</label>
                    <Controller
                      name="contactPerson.phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="+234 801 234 5678"
                          $hasError={!!errors.contactPerson?.phone}
                        />
                      )}
                    />
                    {errors.contactPerson?.phone && <div className="error">{errors.contactPerson.phone.message}</div>}
                  </FormField>
                </FormGrid>
              </FormSection>
            )}

            {currentStep === 3 && (
              <FormSection
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-title">
                  <Users size={24} />
                  Team Details
                </div>

                <FormGrid>
                  <FormField>
                    <label>Team Size *</label>
                    <Controller
                      name="teamSize"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="5"
                          max="20"
                          placeholder="5-20 members"
                          $hasError={!!errors.teamSize}
                        />
                      )}
                    />
                    {errors.teamSize && <div className="error">{errors.teamSize.message}</div>}
                  </FormField>

                  <FormField className="full-width">
                    <label>Preferred Sports *</label>
                    <CheckboxGroup>
                      {sports.map((sport) => (
                        <CheckboxLabel key={sport}>
                          <Controller
                            name="preferredSports"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                value={sport}
                                checked={field.value?.includes(sport) || false}
                                onChange={(e) => {
                                  const currentValues = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...currentValues, sport]);
                                  } else {
                                    field.onChange(currentValues.filter((v) => v !== sport));
                                  }
                                }}
                              />
                            )}
                          />
                          {sport}
                        </CheckboxLabel>
                      ))}
                    </CheckboxGroup>
                    {errors.preferredSports && <div className="error">{errors.preferredSports.message}</div>}
                  </FormField>

                  <FormField className="full-width">
                    <label>Application Package *</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '0.5rem' }}>
                      {[
                        { id: 'Silver', label: 'Silver Application', price: 250000, display: '₦250K' },
                        { id: 'Gold', label: 'Gold Application', price: 500000, display: '₦500K' },
                        { id: 'Platinum', label: 'Platinum Application', price: 1000000, display: '₦1M' }
                      ].map((pkg) => (
                        <div
                          key={pkg.id}
                          style={{
                            padding: '1rem',
                            border: `2px solid ${watchedValues.applicationPackage === pkg.id ? 'var(--primary-green)' : 'rgba(0, 255, 136, 0.1)'}`,
                            borderRadius: 'var(--border-radius)',
                            background: 'var(--dark-bg-secondary)',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            textAlign: 'center'
                          }}
                          onClick={() => {
                            setValue('applicationPackage', pkg.id);
                            setValue('packagePrice', pkg.price);
                          }}
                        >
                          <div style={{ fontWeight: '600', color: 'var(--primary-green)', marginBottom: '0.25rem' }}>
                            {pkg.label}
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>
                            {pkg.display}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.applicationPackage && <div className="error">{errors.applicationPackage.message}</div>}
                  </FormField>
                </FormGrid>
              </FormSection>
            )}

            {currentStep === 4 && (
              <FormSection
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-title">
                  <Trophy size={24} />
                  Review & Submit
                </div>

                <div>
                  <h3>Please review your registration details:</h3>
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--dark-bg-secondary)', borderRadius: 'var(--border-radius)' }}>
                    <p><strong>Package:</strong> {watchedValues.applicationPackage} - ₦{watchedValues.packagePrice?.toLocaleString()}</p>
                    <p><strong>Company:</strong> {watchedValues.companyName}</p>
                    <p><strong>Type:</strong> {watchedValues.companyType}</p>
                    <p><strong>Contact:</strong> {watchedValues.contactPerson?.name}</p>
                    <p><strong>Email:</strong> {watchedValues.contactPerson?.email}</p>
                    <p><strong>Team Size:</strong> {watchedValues.teamSize}</p>
                    <p><strong>Sports:</strong> {watchedValues.preferredSports?.filter(Boolean).join(', ')}</p>
                    {paymentReference && (
                      <p style={{ color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                        <strong>Payment Reference:</strong> {paymentReference}
                      </p>
                    )}
                  </div>
                </div>
              </FormSection>
            )}
          </AnimatePresence>

          <NavigationButtons>
            <Button
              $variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={20} />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                $variant="primary"
                onClick={handleNext}
              >
                Next
                <ArrowRight size={20} />
              </Button>
            ) : (
              <Button
                $variant="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
                <ArrowRight size={20} />
              </Button>
            )}
          </NavigationButtons>
        </FormContainer>
      </Container>

                      {/* Bank Transfer Modal */}
                <BankTransferModal
                  isOpen={showBankTransferModal}
                  onClose={() => setShowBankTransferModal(false)}
                  registrationData={{
                    companyName: watchedValues.companyName,
                    applicationPackage: watchedValues.applicationPackage,
                    packagePrice: watchedValues.packagePrice || 0
                  }}
                  paymentReference={paymentReference || undefined}
                  onReceiptUpload={() => setShowReceiptUpload(true)}
                />

                {/* Receipt Upload Modal */}
                {showReceiptUpload && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                  }}>
                    <div style={{
                      background: 'var(--dark-bg)',
                      borderRadius: 'var(--border-radius-lg)',
                      padding: '1.5rem',
                      maxWidth: '500px',
                      width: '100%',
                      position: 'relative'
                    }}>
                      <button
                        onClick={() => setShowReceiptUpload(false)}
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: 'none',
                          border: 'none',
                          color: 'var(--gray)',
                          cursor: 'pointer',
                          padding: '0.5rem'
                        }}
                      >
                        <X size={18} />
                      </button>

                      <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem' }}>
                        Upload Payment Receipt
                      </h3>

                      <div style={{ marginBottom: '1rem' }}>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--dark-bg-tertiary)',
                            borderRadius: 'var(--border-radius)',
                            background: 'var(--dark-bg-secondary)',
                            color: 'var(--white)'
                          }}
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                          Accepted formats: JPEG, PNG, GIF, PDF (Max 5MB)
                        </p>
                      </div>

                      {receiptFile && (
                        <div style={{
                          background: 'var(--dark-bg-secondary)',
                          padding: '0.75rem',
                          borderRadius: 'var(--border-radius)',
                          marginBottom: '1rem'
                        }}>
                          <p style={{ color: 'var(--white)', margin: 0 }}>
                            Selected: {receiptFile.name}
                          </p>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          onClick={handleReceiptUpload}
                          disabled={!receiptFile || isUploadingReceipt}
                          style={{
                            background: 'linear-gradient(135deg, var(--primary-green), var(--primary-green-dark))',
                            color: 'var(--dark-bg)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--border-radius)',
                            cursor: receiptFile && !isUploadingReceipt ? 'pointer' : 'not-allowed',
                            opacity: receiptFile && !isUploadingReceipt ? 1 : 0.6
                          }}
                        >
                          {isUploadingReceipt ? 'Uploading...' : 'Upload Receipt'}
                        </button>
                        <button
                          onClick={() => setShowReceiptUpload(false)}
                          style={{
                            background: 'var(--dark-bg-secondary)',
                            color: 'var(--white)',
                            border: '1px solid var(--dark-bg-tertiary)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Receipt Upload Success Modal */}
                {showReceiptSuccess && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                  }}>
                    <div style={{
                      background: 'var(--dark-bg)',
                      borderRadius: 'var(--border-radius-lg)',
                      padding: '2rem',
                      maxWidth: '600px',
                      width: '100%',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        color: 'var(--primary-green)'
                      }}>
                        🎉
                      </div>

                      <h2 style={{ 
                        color: 'var(--primary-green)', 
                        marginBottom: '1rem',
                        fontSize: '1.8rem'
                      }}>
                        Thank You!
                      </h2>

                      <div style={{
                        background: 'var(--dark-bg-secondary)',
                        padding: '1.5rem',
                        borderRadius: 'var(--border-radius)',
                        marginBottom: '1.5rem',
                        border: '1px solid var(--primary-green)'
                      }}>
                        <p style={{ 
                          color: 'var(--white)', 
                          marginBottom: '1rem',
                          fontSize: '1.1rem',
                          lineHeight: '1.6'
                        }}>
                          Your payment receipt has been uploaded successfully!
                        </p>
                        
                        <p style={{ 
                          color: 'var(--gray)', 
                          fontSize: '1rem',
                          lineHeight: '1.5'
                        }}>
                          We have received your registration and payment confirmation. 
                          Please check your email for further information about The Real Estate Games, 
                          including event details, schedule, and next steps.
                        </p>
                      </div>

                      <div style={{
                        background: 'var(--dark-bg-tertiary)',
                        padding: '1rem',
                        borderRadius: 'var(--border-radius)',
                        marginBottom: '1.5rem'
                      }}>
                        <p style={{ 
                          color: 'var(--primary-green)', 
                          fontWeight: 'bold',
                          marginBottom: '0.5rem'
                        }}>
                          Payment Reference: {paymentReference}
                        </p>
                        <p style={{ 
                          color: 'var(--gray)', 
                          fontSize: '0.9rem'
                        }}>
                          Keep this reference for your records
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setShowReceiptSuccess(false);
                            window.location.href = '/';
                          }}
                          style={{
                            background: 'linear-gradient(135deg, var(--primary-green), var(--primary-green-dark))',
                            color: 'var(--dark-bg)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          Return to Home
                        </button>
                        <button
                          onClick={() => setShowReceiptSuccess(false)}
                          style={{
                            background: 'var(--dark-bg-secondary)',
                            color: 'var(--white)',
                            border: '1px solid var(--dark-bg-tertiary)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer'
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
    </RegistrationContainer>
  );
};

export default Registration; 