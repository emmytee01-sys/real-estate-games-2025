// API Configuration for different environments
const API_BASE_URL = 'https://real-estate-games-api.onrender.com/api';

export const API_ENDPOINTS = {
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/admin/auth/login`,
  ADMIN_PROFILE: `${API_BASE_URL}/admin/auth/profile`,
  ADMIN_LOGOUT: `${API_BASE_URL}/admin/auth/logout`,
  
  // Dashboard endpoints
  DASHBOARD_STATS: `${API_BASE_URL}/admin/dashboard/stats`,
  DASHBOARD_COMPANIES: `${API_BASE_URL}/admin/dashboard/companies`,
  DASHBOARD_TICKETS: `${API_BASE_URL}/admin/dashboard/tickets`,
  DASHBOARD_APPROVE_PAYMENT: `${API_BASE_URL}/admin/dashboard/approve-payment`,
  DASHBOARD_REJECT_PAYMENT: `${API_BASE_URL}/admin/dashboard/reject-payment`,
  DASHBOARD_CHECKIN_TICKET: `${API_BASE_URL}/admin/dashboard/checkin-ticket`,
  DASHBOARD_TICKET_BY_NUMBER: `${API_BASE_URL}/admin/dashboard/tickets/number`,
  
  // Registration endpoints
  REGISTRATIONS: `${API_BASE_URL}/registrations`,
  UPLOAD_RECEIPT: `${API_BASE_URL}/upload/receipt`,
  
  // Ticket endpoints
  TICKETS: `${API_BASE_URL}/tickets`,
  
  // Contact endpoints
  CONTACT: `${API_BASE_URL}/contact`,
  
  // Sponsor endpoints
  SPONSORS: `${API_BASE_URL}/sponsors`,
};

export default API_BASE_URL; 