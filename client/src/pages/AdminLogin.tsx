import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

const AdminLoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  h1 {
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  
  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
    z-index: 1;
  }
  
  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
    cursor: pointer;
    z-index: 1;
    
    &:hover {
      color: var(--white);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: var(--gray);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-green);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
  color: var(--dark-bg);
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store admin token and info
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      
      toast.success('Login successful!');
      navigate('/admin/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          <span className="icon">🛡️</span>
          <h1>Admin Login</h1>
          <p className="subtitle">Access the Real Estate Games admin panel</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Mail className="input-icon" size={20} />
            <Input
              type="text"
              name="username"
              placeholder="Email or username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Lock className="input-icon" size={20} />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {showPassword ? (
              <EyeOff 
                className="password-toggle" 
                size={20} 
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye 
                className="password-toggle" 
                size={20} 
                onClick={() => setShowPassword(true)}
              />
            )}
          </InputGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Logging in...
              </>
            ) : (
              <>
                <Shield size={20} />
                Login to Admin Panel
              </>
            )}
          </Button>
        </Form>

                  <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem', 
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            fontSize: '0.8rem',
            color: 'var(--gray)'
          }}>
            <strong>Default Admin Credentials:</strong><br />
            Username/Email: admin@realestategames.com<br />
            Password: admin123
          </div>
      </LoginCard>
    </AdminLoginContainer>
  );
};

export default AdminLogin; 