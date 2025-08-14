import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { X, Copy, CheckCircle, Banknote, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--dark-bg);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  max-width: 550px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--dark-bg-tertiary);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    color: var(--white);
    background: var(--dark-bg-secondary);
  }
`;

const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  h2 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  p {
    color: var(--gray);
    font-size: 0.9rem;
  }
`;

const PaymentDetails = styled.div`
  background: var(--dark-bg-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    
    &:last-child {
      margin-bottom: 0;
      border-top: 1px solid var(--dark-bg-tertiary);
      padding-top: 0.5rem;
      font-weight: 600;
      font-size: 1rem;
      color: var(--primary-green);
    }
  }
`;

const BankAccountSection = styled.div`
  background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
  color: var(--dark-bg);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  .account-details {
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .account-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .copy-button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: var(--dark-bg);
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-size: 0.875rem;
      transition: var(--transition);
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
`;

const InstructionsSection = styled.div`
  background: var(--dark-bg-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  h3 {
    color: var(--primary-green);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
  }
  
  ol {
    padding-left: 1.25rem;
    
    li {
      margin-bottom: 0.4rem;
      color: var(--gray);
      font-size: 0.9rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
  color: var(--dark-bg);
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-green);
  }
`;

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationData: {
    companyName: string;
    applicationPackage: string;
    packagePrice: number;
  };
  paymentReference?: string;
  onReceiptUpload?: () => void;
}

const BankTransferModal: React.FC<BankTransferModalProps> = ({
  isOpen,
  onClose,
  registrationData,
  paymentReference,
  onReceiptUpload
}) => {
  const bankDetails = {
    bankName: 'FCMB',
    accountName: 'Marygold Production',
    accountNumber: '2001999834',
    accountType: 'Current Account'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <X size={18} />
            </CloseButton>

            <PaymentHeader>
              <h2>Bank Transfer Payment</h2>
              <p>Please transfer the amount to the account details below</p>
            </PaymentHeader>

            <PaymentDetails>
              <div className="detail-row">
                <span>Company:</span>
                <span>{registrationData.companyName}</span>
              </div>
              <div className="detail-row">
                <span>Package:</span>
                <span>{registrationData.applicationPackage}</span>
              </div>
              <div className="detail-row">
                <span>Amount to Pay:</span>
                <span>₦{registrationData.packagePrice.toLocaleString()}</span>
              </div>
            </PaymentDetails>

            <BankAccountSection>
              <h3>
                <Banknote size={20} />
                Bank Account Details
              </h3>
              <div className="account-details">
                <div className="account-row">
                  <span>Bank Name:</span>
                  <span>{bankDetails.bankName}</span>
                </div>
                <div className="account-row">
                  <span>Account Name:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{bankDetails.accountName}</span>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(bankDetails.accountName, 'Account name')}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="account-row">
                  <span>Account Number:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                      {bankDetails.accountNumber}
                    </span>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="account-row">
                  <span>Account Type:</span>
                  <span>{bankDetails.accountType}</span>
                </div>
              </div>
            </BankAccountSection>

            <InstructionsSection>
              <h3>
                <CheckCircle size={20} />
                Payment Instructions
              </h3>
              <ol>
                <li>Transfer exactly <strong>₦{registrationData.packagePrice.toLocaleString()}</strong></li>
                <li>Use company name and <strong>{paymentReference}</strong> as payment description</li>
                <li>Keep transfer receipt for verification</li>
                <li>Upload receipt after payment for faster verification</li>
                <li>Registration confirmed within 24 hours</li>
              </ol>
            </InstructionsSection>

            {onReceiptUpload && (
              <div style={{ 
                background: 'var(--dark-bg-secondary)', 
                borderRadius: 'var(--border-radius)', 
                padding: '1rem', 
                marginBottom: '1rem',
                border: '2px dashed var(--primary-green)'
              }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>
                  📤 Upload Payment Receipt
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                  After making the transfer, upload your receipt for faster verification
                </p>
                <ActionButton onClick={onReceiptUpload} style={{ marginBottom: '0' }}>
                  <Upload size={18} />
                  Upload Receipt
                </ActionButton>
              </div>
            )}

            <ActionButton onClick={onClose}>
              <CheckCircle size={18} />
              I Understand - Close
            </ActionButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default BankTransferModal; 