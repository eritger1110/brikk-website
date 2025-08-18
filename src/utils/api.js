// API Configuration and Client
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://5000-i7wgcn38h6qt0ah2wob85-8da4a055.manusvm.computer'
  : 'http://localhost:5000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('brikk_auth_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('brikk_auth_token', token);
    } else {
      localStorage.removeItem('brikk_auth_token');
    }
  }

  // Get authentication headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.auth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      auth: false
    });
  }

  async login(credentials) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      auth: false
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    this.setToken(null);
    return { success: true };
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  // API Key management
  async generateApiKey(name) {
    return this.request('/api/auth/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async getApiKeys() {
    return this.request('/api/auth/api-keys');
  }

  async revokeApiKey(keyId) {
    return this.request(`/api/auth/api-keys/${keyId}`, {
      method: 'DELETE'
    });
  }

  // Usage analytics
  async getUsageAnalytics(days = 30) {
    return this.request(`/api/billing/usage-analytics?days=${days}`);
  }

  async getUserStats() {
    return this.request('/api/auth/stats');
  }

  // Billing methods
  async getPlans() {
    return this.request('/api/billing/plans', { auth: false });
  }

  async createCheckoutSession(plan) {
    return this.request('/api/billing/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ plan })
    });
  }

  async createPortalSession() {
    return this.request('/api/billing/create-portal-session', {
      method: 'POST'
    });
  }

  async getSubscription() {
    return this.request('/api/billing/subscription');
  }

  // Agent coordination methods
  async getAgents() {
    return this.request('/api/agents');
  }

  async registerAgent(agentData) {
    return this.request('/api/agents/register', {
      method: 'POST',
      body: JSON.stringify(agentData)
    });
  }

  async sendMessage(messageData) {
    return this.request('/api/coordination/messages/send', {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  }

  async getMessages(sessionId) {
    return this.request(`/api/coordination/messages/${sessionId}`);
  }

  async createSession(sessionData) {
    return this.request('/api/coordination/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }

  async getSessions() {
    return this.request('/api/coordination/sessions');
  }

  // Admin methods (for admin portal)
  async getAdminStats() {
    return this.request('/api/admin/stats');
  }

  async getAllUsers() {
    return this.request('/api/admin/users');
  }

  async getSystemHealth() {
    return this.request('/health', { auth: false });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Utility functions for common operations
export const auth = {
  register: (userData) => apiClient.register(userData),
  login: (credentials) => apiClient.login(credentials),
  logout: () => apiClient.logout(),
  getCurrentUser: () => apiClient.getCurrentUser(),
  isAuthenticated: () => !!apiClient.token,
  getToken: () => apiClient.token
};

export const billing = {
  getPlans: () => apiClient.getPlans(),
  createCheckoutSession: (plan) => apiClient.createCheckoutSession(plan),
  createPortalSession: () => apiClient.createPortalSession(),
  getSubscription: () => apiClient.getSubscription(),
  getUsageAnalytics: (days) => apiClient.getUsageAnalytics(days)
};

export const apiKeys = {
  generate: (name) => apiClient.generateApiKey(name),
  list: () => apiClient.getApiKeys(),
  revoke: (keyId) => apiClient.revokeApiKey(keyId)
};

export const coordination = {
  getAgents: () => apiClient.getAgents(),
  registerAgent: (agentData) => apiClient.registerAgent(agentData),
  sendMessage: (messageData) => apiClient.sendMessage(messageData),
  getMessages: (sessionId) => apiClient.getMessages(sessionId),
  createSession: (sessionData) => apiClient.createSession(sessionData),
  getSessions: () => apiClient.getSessions()
};

export const analytics = {
  getUserStats: () => apiClient.getUserStats(),
  getUsageAnalytics: (days) => apiClient.getUsageAnalytics(days)
};

export const admin = {
  getStats: () => apiClient.getAdminStats(),
  getAllUsers: () => apiClient.getAllUsers(),
  getSystemHealth: () => apiClient.getSystemHealth()
};

export default apiClient;

