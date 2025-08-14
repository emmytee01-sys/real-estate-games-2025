import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { 
  CheckCircle,
  XCircle,
  LogOut,
  Eye
} from 'lucide-react';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin: 0;
  }
  
  .logout-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  
  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .number {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: var(--gray);
    font-size: 0.9rem;
  }
`;

const NavigationTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--primary-green)' : 'transparent'};
  color: ${props => props.active ? 'var(--dark-bg)' : 'var(--white)'};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-green)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  min-height: 400px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  input {
    flex: 1;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: var(--white);
    
    &::placeholder {
      color: var(--gray);
    }
  }
  
  button {
    background: var(--primary-green);
    color: var(--dark-bg);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
  }
  
  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ActionButton = styled.button<{ variant?: 'approve' | 'reject' | 'view' }>`
  background: ${props => {
    if (props.variant === 'approve') return 'var(--primary-green)';
    if (props.variant === 'reject') return '#ef4444';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${props => props.variant ? 'white' : 'var(--white)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CheckInSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  
  h3 {
    margin-bottom: 1rem;
  }
  
  .checkin-form {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    
    input {
      flex: 1;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: var(--white);
    }
    
    button {
      background: var(--primary-green);
      color: var(--dark-bg);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

const Modal = styled.div`
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
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: var(--dark-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    color: var(--primary-green);
  }
  
  button {
    background: none;
    border: none;
    color: var(--gray);
    font-size: 1.5rem;
    cursor: pointer;
    
    &:hover {
      color: var(--white);
    }
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  .label {
    font-weight: 600;
    color: var(--gray);
  }
  
  .value {
    color: var(--white);
  }
`;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const navigate = useNavigate();

  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [adminToken, navigate]);

  const loadDashboardData = async () => {
    try {
      const [statsRes, companiesRes, ticketsRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats', {
          headers: { Authorization: `Bearer ${adminToken}` }
        }),
        fetch('/api/admin/dashboard/companies', {
          headers: { Authorization: `Bearer ${adminToken}` }
        }),
        fetch('/api/admin/dashboard/tickets', {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (companiesRes.ok) setCompanies((await companiesRes.json()).companies);
      if (ticketsRes.ok) setTickets((await ticketsRes.json()).tickets);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const handleApprovePayment = async (companyId: string) => {
    try {
      const response = await fetch(`/api/admin/dashboard/companies/${companyId}/approve-payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ adminNotes: 'Payment approved by admin' })
      });

      if (response.ok) {
        toast.success('Payment approved successfully');
        loadDashboardData();
      } else {
        toast.error('Failed to approve payment');
      }
    } catch (error) {
      toast.error('Error approving payment');
    }
  };

  const handleRejectPayment = async (companyId: string) => {
    try {
      const response = await fetch(`/api/admin/dashboard/companies/${companyId}/reject-payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ adminNotes: 'Payment rejected by admin' })
      });

      if (response.ok) {
        toast.success('Payment rejected successfully');
        loadDashboardData();
      } else {
        toast.error('Failed to reject payment');
      }
    } catch (error) {
      toast.error('Error rejecting payment');
    }
  };

  const handleViewTicketForCheckIn = async () => {
    if (!ticketNumber.trim()) {
      toast.error('Please enter a ticket number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/dashboard/tickets/number/${ticketNumber.trim()}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (response.ok) {
        const result = await response.json();
        setSelectedTicket(result.ticket);
        setShowTicketModal(true);
        setTicketNumber('');
      } else {
        toast.error('Ticket not found');
      }
    } catch (error) {
      toast.error('Error searching for ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckInFromModal = async () => {
    if (!selectedTicket) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/dashboard/tickets/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ ticketNumber: selectedTicket.ticketNumber })
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Ticket checked in: ${result.ticket.customerName}`);
        setShowTicketModal(false);
        setSelectedTicket(null);
        loadDashboardData();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to check in ticket');
      }
    } catch (error) {
      toast.error('Error checking in ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleSearchTicket = async () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a ticket number to search');
      return;
    }

    try {
      const response = await fetch(`/api/admin/dashboard/tickets/number/${searchTerm.trim()}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (response.ok) {
        const result = await response.json();
        setSelectedTicket(result.ticket);
        setShowTicketModal(true);
      } else {
        toast.error('Ticket not found');
      }
    } catch (error) {
      toast.error('Error searching for ticket');
    }
  };

  const renderDashboard = () => (
    <div>
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="icon">🏢</div>
          <div className="number">{stats?.stats?.totalCompanies || 0}</div>
          <div className="label">Total Companies</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="icon">🎫</div>
          <div className="number">{stats?.stats?.totalTickets || 0}</div>
          <div className="label">Total Tickets</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="icon">⏳</div>
          <div className="number">{stats?.stats?.pendingPayments || 0}</div>
          <div className="label">Pending Payments</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="icon">✅</div>
          <div className="number">{stats?.stats?.confirmedPayments || 0}</div>
          <div className="label">Confirmed Payments</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="icon">🎫</div>
          <div className="number">{stats?.stats?.checkedInTickets || 0}</div>
          <div className="label">Checked In Tickets</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="icon">⏳</div>
          <div className="number">{stats?.stats?.inactiveTickets || 0}</div>
          <div className="label">Inactive Tickets</div>
        </StatCard>
      </StatsGrid>

      <CheckInSection>
        <h3>🎫 Ticket Check-In</h3>
        <div className="checkin-form">
          <input
            type="text"
            placeholder="Enter ticket number (e.g., TKT123456)"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleViewTicketForCheckIn()}
          />
          <button onClick={handleViewTicketForCheckIn} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'View Ticket'}
          </button>
        </div>
      </CheckInSection>
    </div>
  );

  const renderCompanies = () => (
    <div>
      <SearchBar>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      
      <Table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Package</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .filter(company => 
              company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              company.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(company => (
            <tr key={company._id}>
              <td>
                <strong>{company.companyName}</strong><br />
                <small>{company.companyType}</small>
              </td>
              <td>
                {company.contactPerson.name}<br />
                <small>{company.contactPerson.email}</small>
              </td>
              <td>{company.applicationPackage}</td>
              <td>
                <span style={{
                  color: company.paymentStatus === 'completed' ? 'var(--primary-green)' : 
                         company.paymentStatus === 'failed' ? '#ef4444' : '#fbbf24'
                }}>
                  {company.paymentStatus}
                </span>
              </td>
              <td>
                {company.paymentStatus === 'pending' && (
                  <>
                    <ActionButton 
                      variant="approve" 
                      onClick={() => handleApprovePayment(company._id)}
                    >
                      <CheckCircle size={14} /> Approve
                    </ActionButton>
                    <ActionButton 
                      variant="reject" 
                      onClick={() => handleRejectPayment(company._id)}
                    >
                      <XCircle size={14} /> Reject
                    </ActionButton>
                  </>
                )}
                <ActionButton onClick={() => handleViewCompany(company)}>
                  <Eye size={14} /> View
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderTickets = () => (
    <div>
      <SearchBar>
        <input
          type="text"
          placeholder="Search tickets by ticket number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchTicket()}
        />
        <button onClick={handleSearchTicket}>Search Ticket</button>
      </SearchBar>
      
      <Table>
        <thead>
          <tr>
            <th>Ticket #</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Event Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets
            .filter(ticket => 
              ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(ticket => (
            <tr key={ticket._id}>
              <td>
                <strong>{ticket.ticketNumber}</strong>
              </td>
              <td>
                {ticket.customerName}<br />
                <small>{ticket.customerEmail}</small>
              </td>
              <td>{ticket.ticketType}</td>
              <td>{new Date(ticket.eventDate).toLocaleDateString()}</td>
              <td>
                <span style={{
                  color: ticket.checkedIn ? 'var(--primary-green)' : 
                         ticket.status === 'cancelled' ? '#ef4444' : 
                         ticket.status === 'inactive' ? '#fbbf24' : '#22c55e'
                }}>
                  {ticket.checkedIn ? 'Checked In' : 
                   ticket.status === 'inactive' ? 'Inactive' : 
                   ticket.status === 'active' ? 'Active' : ticket.status}
                </span>
              </td>
              <td>
                <ActionButton onClick={() => handleViewTicket(ticket)}>
                  <Eye size={14} /> View
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <DashboardContainer>
      <Header>
        <h1>🛡️ Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </Header>

      <NavigationTabs>
        <Tab 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </Tab>
        <Tab 
          active={activeTab === 'companies'} 
          onClick={() => setActiveTab('companies')}
        >
          🏢 Companies
        </Tab>
        <Tab 
          active={activeTab === 'tickets'} 
          onClick={() => setActiveTab('tickets')}
        >
          🎫 Tickets
        </Tab>
      </NavigationTabs>

      <ContentSection>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'companies' && renderCompanies()}
        {activeTab === 'tickets' && renderTickets()}
      </ContentSection>

      {/* Company Details Modal */}
      {showCompanyModal && selectedCompany && (
        <Modal onClick={() => setShowCompanyModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Company Details</h2>
              <button onClick={() => setShowCompanyModal(false)}>×</button>
            </ModalHeader>
            
            <DetailRow>
              <span className="label">Company Name:</span>
              <span className="value">{selectedCompany.companyName}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Company Type:</span>
              <span className="value">{selectedCompany.companyType}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Contact Person:</span>
              <span className="value">{selectedCompany.contactPerson.name}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Email:</span>
              <span className="value">{selectedCompany.contactPerson.email}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Phone:</span>
              <span className="value">{selectedCompany.contactPerson.phone}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Position:</span>
              <span className="value">{selectedCompany.contactPerson.position}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Package:</span>
              <span className="value">{selectedCompany.applicationPackage}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Amount:</span>
              <span className="value">₦{selectedCompany.packagePrice?.toLocaleString()}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Payment Status:</span>
              <span className="value" style={{
                color: selectedCompany.paymentStatus === 'completed' ? 'var(--primary-green)' : 
                       selectedCompany.paymentStatus === 'failed' ? '#ef4444' : '#fbbf24'
              }}>
                {selectedCompany.paymentStatus}
              </span>
            </DetailRow>
            <DetailRow>
              <span className="label">Payment Reference:</span>
              <span className="value">{selectedCompany.paymentReference}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Registration Date:</span>
              <span className="value">{new Date(selectedCompany.registrationDate).toLocaleDateString()}</span>
            </DetailRow>
            {selectedCompany.adminNotes && (
              <DetailRow>
                <span className="label">Admin Notes:</span>
                <span className="value">{selectedCompany.adminNotes}</span>
              </DetailRow>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Ticket Details Modal */}
      {showTicketModal && selectedTicket && (
        <Modal onClick={() => setShowTicketModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Ticket Details</h2>
              <button onClick={() => setShowTicketModal(false)}>×</button>
            </ModalHeader>
            
            <DetailRow>
              <span className="label">Ticket Number:</span>
              <span className="value">{selectedTicket.ticketNumber}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Customer Name:</span>
              <span className="value">{selectedTicket.customerName}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Email:</span>
              <span className="value">{selectedTicket.customerEmail}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Phone:</span>
              <span className="value">{selectedTicket.customerPhone}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Ticket Type:</span>
              <span className="value">{selectedTicket.ticketType}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Event Date:</span>
              <span className="value">{new Date(selectedTicket.eventDate).toLocaleDateString()}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Event Time:</span>
              <span className="value">{selectedTicket.eventTime}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Venue:</span>
              <span className="value">{selectedTicket.venue}</span>
            </DetailRow>
            <DetailRow>
              <span className="label">Status:</span>
              <span className="value" style={{
                color: selectedTicket.status === 'active' ? 'var(--primary-green)' : 
                       selectedTicket.status === 'cancelled' ? '#ef4444' : '#fbbf24'
              }}>
                {selectedTicket.status}
              </span>
            </DetailRow>
            <DetailRow>
              <span className="label">Checked In:</span>
              <span className="value" style={{
                color: selectedTicket.checkedIn ? 'var(--primary-green)' : '#fbbf24'
              }}>
                {selectedTicket.checkedIn ? 'Yes' : 'No'}
              </span>
            </DetailRow>
            {selectedTicket.checkedIn && (
              <DetailRow>
                <span className="label">Check-in Time:</span>
                <span className="value">{new Date(selectedTicket.checkedInAt).toLocaleString()}</span>
              </DetailRow>
            )}
            <DetailRow>
              <span className="label">Booking Date:</span>
              <span className="value">{new Date(selectedTicket.bookingDate).toLocaleDateString()}</span>
            </DetailRow>
            {selectedTicket.specialRequests && (
              <DetailRow>
                <span className="label">Special Requests:</span>
                <span className="value">{selectedTicket.specialRequests}</span>
              </DetailRow>
            )}
            
            {/* Check-in button for inactive tickets */}
            {selectedTicket.status === 'inactive' && !selectedTicket.checkedIn && (
              <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: 'rgba(0, 255, 136, 0.1)', 
                borderRadius: '8px',
                border: '1px solid var(--primary-green)'
              }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary-green)' }}>
                  🎫 Ready to Check In
                </h4>
                <p style={{ margin: '0 0 1rem 0', color: 'var(--gray)' }}>
                  This ticket is ready to be checked in. Click the button below to confirm check-in.
                </p>
                <button
                  onClick={handleCheckInFromModal}
                  disabled={isLoading}
                  style={{
                    background: 'var(--primary-green)',
                    color: 'var(--dark-bg)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    width: '100%'
                  }}
                >
                  {isLoading ? 'Checking In...' : '✅ Check In Ticket'}
                </button>
              </div>
            )}
            
            {/* Already checked in message */}
            {selectedTicket.checkedIn && (
              <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: 'rgba(34, 197, 94, 0.1)', 
                borderRadius: '8px',
                border: '1px solid #22c55e',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0', color: '#22c55e' }}>
                  ✅ Already Checked In
                </h4>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--gray)' }}>
                  This ticket was checked in on {new Date(selectedTicket.checkedInAt).toLocaleString()}
                </p>
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard; 