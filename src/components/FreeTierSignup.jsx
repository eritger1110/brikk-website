import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Building, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Shield,
  Code,
  Users,
  MapPin,
  CreditCard,
  Crown
} from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

// Mock functions for demo purposes
const createCustomer = async () => ({ id: 'demo_customer' });
const createPaymentMethod = async () => ({ id: 'demo_payment' });
const formatCardNumber = (num) => num;
const validateCardInfo = () => ({ isValid: true });
import PolicyPopup from './PolicyPopup';

const FreeTierSignup = ({ onSignupComplete, onBackToLanding }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    useCase: '',
    selectedPlan: 'free',
    // Address fields
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment fields
    addPayment: false,
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [policyPopup, setPolicyPopup] = useState({ isOpen: false, type: '', title: '', content: '' });

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for developers and proof-of-concepts',
      features: ['1,000 API calls/month', '2 agents maximum', 'Community support', 'All 6 languages', '$0.008 per extra call'],
      highlight: false,
      requiresPayment: false
    },
    {
      id: 'hacker',
      name: 'Hacker',
      price: '$49',
      period: 'per month',
      description: 'For developers building serious projects',
      features: ['7,500 API calls/month', '3 agents maximum', 'Email support', 'All 6 languages', '$0.008 per extra call'],
      highlight: false,
      requiresPayment: true,
      badge: 'Developer Favorite'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$99',
      period: 'per month',
      description: 'For small teams getting serious about agent coordination',
      features: ['10,000 API calls/month', '5 agents maximum', 'Email support', 'Remove branding', '$0.005 per extra call'],
      highlight: true,
      requiresPayment: true
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'For businesses scaling agent coordination',
      features: ['100,000 API calls/month', '25 agents maximum', 'Phone support', 'Advanced analytics', '$0.002 per extra call', 'Reduced marketplace fee (2.4%)'],
      highlight: false,
      requiresPayment: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For Fortune 500 companies and large deployments',
      features: ['Unlimited API calls', 'Unlimited agents', 'Dedicated support', 'Custom SLA', 'Negotiated overage rates', 'Reduced marketplace fee (2.0%)'],
      highlight: false,
      requiresPayment: true
    }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear errors as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password).isValid) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Please tell us about your use case';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Validate payment information if provided
      if (formData.addPayment) {
        const cardValidation = validateCardInfo(
          formData.cardNumber,
          formData.cardExpiry,
          formData.cardCvc
        );
        
        if (!cardValidation.isValid) {
          setErrors(cardValidation.errors);
          setIsLoading(false);
          return;
        }
      }
      
      // Prepare customer data for Stripe
      const customerData = {
        email: formData.email,
        name: formData.name,
        company: formData.company,
        plan_type: formData.selectedPlan,
        address: formData.address ? {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zipCode,
          country: formData.country
        } : null
      };
      
      // If payment method is provided, create it first
      if (formData.addPayment && formData.selectedPlan !== 'free') {
        try {
          // Create payment method (this would need Stripe Elements in a real implementation)
          // For now, we'll simulate the payment method creation
          const paymentMethodId = 'pm_simulated_' + Date.now();
          customerData.payment_method_id = paymentMethodId;
        } catch (paymentError) {
          setErrors({ submit: 'Payment processing failed. Please check your card details.' });
          setIsLoading(false);
          return;
        }
      }
      
      // Create customer and subscription
      const response = await fetch('/api/payments/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // If subscription requires payment confirmation
        if (data.subscription && data.subscription.client_secret) {
          // In a real implementation, you would confirm the payment here
          // For now, we'll proceed as if payment was successful
          console.log('Payment confirmation would happen here');
        }
        
        onSignupComplete({
          ...data,
          user: {
            ...data,
            plan_type: formData.selectedPlan,
            company: formData.company,
            use_case: formData.useCase
          }
        });
      } else {
        setErrors({ submit: data.error || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "1,000 Free API Calls",
      description: "Perfect for building proof-of-concepts and testing agent coordination"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "All 6 Programming Languages",
      description: "Python, Node.js, Java, Go, Rust, and C# support included"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Same security architecture used by Fortune 500 companies"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Developer Community",
      description: "Join 500+ developers building with Brikk"
    }
  ];

  return (
    <div style={{ 
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <button
            onClick={() => {
              onBackToLanding();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--brikk-slate-text)',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to Home
          </button>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img 
              src={BrikkLogo} 
              alt="Brikk Logo" 
              style={{
                height: '40px',
                width: 'auto'
              }}
            />
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--brikk-white)',
                lineHeight: 1
              }}>
                Brikk
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--brikk-slate-text)',
                lineHeight: 1
              }}>
                AI Agent Infrastructure
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Left Side - Benefits */}
          <div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'var(--brikk-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Start Building with Brikk
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              Join 500+ developers already building the future of AI agent coordination. Get started with 1,000 free API calls and 2 agents.
            </p>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                What's Included in Your Free Account:
              </h3>
              
              <div style={{ 
                display: 'grid',
                gap: '1.5rem'
              }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ 
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ 
                      color: 'var(--brikk-purple)',
                      background: 'rgba(115, 95, 255, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 style={{ 
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {benefit.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--brikk-slate-text)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div style={{ 
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <Shield className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
                <span style={{ fontWeight: '600' }}>Enterprise-Grade Security</span>
              </div>
              <p style={{ 
                color: 'var(--brikk-slate-text)',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Your data is protected with enterprise-grade security architecture designed for Fortune 500 compliance requirements. Built with HIPAA and SOC 2 design standards.
              </p>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div style={{ 
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            {/* Progress Indicator */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= 1 ? 'var(--brikk-gradient)' : 'var(--brikk-card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brikk-white)',
                  fontWeight: '600',
                  fontSize: '0.75rem'
                }}>
                  {step > 1 ? <CheckCircle className="w-3 h-3" /> : '1'}
                </div>
                <span style={{ 
                  fontSize: '0.75rem',
                  color: step >= 1 ? 'var(--brikk-white)' : 'var(--brikk-slate-text)'
                }}>
                  Account
                </span>
              </div>
              
              <div style={{ 
                width: '20px',
                height: '2px',
                background: step >= 2 ? 'var(--brikk-purple)' : 'var(--brikk-card-border)',
                borderRadius: '1px'
              }} />
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= 2 ? 'var(--brikk-gradient)' : 'var(--brikk-card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brikk-white)',
                  fontWeight: '600',
                  fontSize: '0.75rem'
                }}>
                  {step > 2 ? <CheckCircle className="w-3 h-3" /> : '2'}
                </div>
                <span style={{ 
                  fontSize: '0.75rem',
                  color: step >= 2 ? 'var(--brikk-white)' : 'var(--brikk-slate-text)'
                }}>
                  Plan
                </span>
              </div>

              <div style={{ 
                width: '20px',
                height: '2px',
                background: step >= 3 ? 'var(--brikk-purple)' : 'var(--brikk-card-border)',
                borderRadius: '1px'
              }} />
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= 3 ? 'var(--brikk-gradient)' : 'var(--brikk-card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brikk-white)',
                  fontWeight: '600',
                  fontSize: '0.75rem'
                }}>
                  3
                </div>
                <span style={{ 
                  fontSize: '0.75rem',
                  color: step >= 3 ? 'var(--brikk-white)' : 'var(--brikk-slate-text)'
                }}>
                  Details
                </span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleStep1Submit}>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}>
                  Create Your Free Account
                </h2>

                {/* Name Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User className="w-5 h-5" style={{ 
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--brikk-slate-text)'
                    }} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.name ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.name) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.name) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    />
                  </div>
                  {errors.name && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail className="w-5 h-5" style={{ 
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--brikk-slate-text)'
                    }} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.email ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.email) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.email) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    />
                  </div>
                  {errors.email && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock className="w-5 h-5" style={{ 
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--brikk-slate-text)'
                    }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      style={{
                        width: '100%',
                        padding: '1rem 3rem 1rem 3rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.password ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--brikk-slate-text)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div style={{ 
                      marginTop: '0.75rem',
                      padding: '1rem',
                      background: 'rgba(115, 95, 255, 0.05)',
                      border: '1px solid rgba(115, 95, 255, 0.2)',
                      borderRadius: '8px'
                    }}>
                      <div style={{ 
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '0.5rem'
                      }}>
                        Password Requirements:
                      </div>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: passwordValidation.minLength ? '#22c55e' : 'var(--brikk-slate-text)'
                        }}>
                          {passwordValidation.minLength ? <CheckCircle className="w-3 h-3" /> : <div style={{ width: '12px', height: '12px', border: '1px solid currentColor', borderRadius: '50%' }} />}
                          8+ characters
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: passwordValidation.hasUpper ? '#22c55e' : 'var(--brikk-slate-text)'
                        }}>
                          {passwordValidation.hasUpper ? <CheckCircle className="w-3 h-3" /> : <div style={{ width: '12px', height: '12px', border: '1px solid currentColor', borderRadius: '50%' }} />}
                          Uppercase letter
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: passwordValidation.hasLower ? '#22c55e' : 'var(--brikk-slate-text)'
                        }}>
                          {passwordValidation.hasLower ? <CheckCircle className="w-3 h-3" /> : <div style={{ width: '12px', height: '12px', border: '1px solid currentColor', borderRadius: '50%' }} />}
                          Lowercase letter
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: passwordValidation.hasNumber ? '#22c55e' : 'var(--brikk-slate-text)'
                        }}>
                          {passwordValidation.hasNumber ? <CheckCircle className="w-3 h-3" /> : <div style={{ width: '12px', height: '12px', border: '1px solid currentColor', borderRadius: '50%' }} />}
                          Number
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: passwordValidation.hasSpecial ? '#22c55e' : 'var(--brikk-slate-text)',
                          gridColumn: '1 / -1'
                        }}>
                          {passwordValidation.hasSpecial ? <CheckCircle className="w-3 h-3" /> : <div style={{ width: '12px', height: '12px', border: '1px solid currentColor', borderRadius: '50%' }} />}
                          Special character (!@#$%^&*)
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock className="w-5 h-5" style={{ 
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--brikk-slate-text)'
                    }} />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--brikk-gradient)',
                    color: 'var(--brikk-white)',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Choose Your Plan
                </h2>
                <p style={{ 
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '2rem',
                  fontSize: '0.875rem'
                }}>
                  Select the plan that best fits your needs. You can upgrade or downgrade at any time.
                </p>

                <div style={{ 
                  display: 'grid',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {pricingPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handleInputChange('selectedPlan', plan.id)}
                      style={{
                        border: `2px solid ${formData.selectedPlan === plan.id ? 'var(--brikk-purple)' : 'var(--brikk-card-border)'}`,
                        borderRadius: '12px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        background: formData.selectedPlan === plan.id ? 'rgba(115, 95, 255, 0.05)' : 'transparent',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.selectedPlan !== plan.id) {
                          e.currentTarget.style.borderColor = 'var(--brikk-purple)';
                          e.currentTarget.style.background = 'rgba(115, 95, 255, 0.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.selectedPlan !== plan.id) {
                          e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {plan.highlight && (
                        <div style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--brikk-gradient)',
                          color: 'var(--brikk-white)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          Most Popular
                        </div>
                      )}
                      
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.25rem'
                          }}>
                            <h3 style={{ 
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              {plan.name}
                            </h3>
                            {plan.id === 'enterprise' && <Crown className="w-4 h-4" style={{ color: 'var(--brikk-teal)' }} />}
                          </div>
                          <div style={{ 
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.25rem',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{ 
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              color: 'var(--brikk-white)'
                            }}>
                              {plan.price}
                            </span>
                            <span style={{ 
                              fontSize: '0.875rem',
                              color: 'var(--brikk-slate-text)'
                            }}>
                              {plan.period}
                            </span>
                          </div>
                          <p style={{ 
                            fontSize: '0.875rem',
                            color: 'var(--brikk-slate-text)',
                            margin: 0
                          }}>
                            {plan.description}
                          </p>
                        </div>
                        
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: `2px solid ${formData.selectedPlan === plan.id ? 'var(--brikk-purple)' : 'var(--brikk-card-border)'}`,
                          background: formData.selectedPlan === plan.id ? 'var(--brikk-purple)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {formData.selectedPlan === plan.id && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--brikk-white)'
                            }} />
                          )}
                        </div>
                      </div>
                      
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.5rem',
                        fontSize: '0.75rem'
                      }}>
                        {plan.features.map((feature, index) => (
                          <div key={index} style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            <CheckCircle className="w-3 h-3" style={{ color: 'var(--brikk-teal)', flexShrink: 0 }} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: 'var(--brikk-slate-text)',
                      border: '1px solid var(--brikk-card-border)',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--brikk-purple)';
                      e.target.style.color = 'var(--brikk-white)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--brikk-card-border)';
                      e.target.style.color = 'var(--brikk-slate-text)';
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    style={{
                      flex: 2,
                      background: 'var(--brikk-gradient)',
                      color: 'var(--brikk-white)',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Continue to Details
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleFinalSubmit}>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Complete Your Account
                </h2>
                <p style={{ 
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '2rem',
                  fontSize: '0.875rem'
                }}>
                  Tell us about your project and provide your business details.
                </p>

                {/* Company Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Company Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building className="w-5 h-5" style={{ 
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--brikk-slate-text)'
                    }} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter your company name"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.company ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.company) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.company) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    />
                  </div>
                  {errors.company && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.company}
                    </div>
                  )}
                </div>

                {/* Use Case Field */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    What will you use Brikk for?
                  </label>
                  <textarea
                    value={formData.useCase}
                    onChange={(e) => handleInputChange('useCase', e.target.value)}
                    placeholder="Tell us about your AI agent coordination use case..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'var(--brikk-dark-bg)',
                      border: `1px solid ${errors.useCase ? '#ef4444' : 'var(--brikk-card-border)'}`,
                      borderRadius: '8px',
                      color: 'var(--brikk-white)',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '100px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      if (!errors.useCase) {
                        e.target.style.borderColor = 'var(--brikk-purple)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.useCase) {
                        e.target.style.borderColor = 'var(--brikk-card-border)';
                      }
                    }}
                  />
                  {errors.useCase && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.875rem'
                    }}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.useCase}
                    </div>
                  )}
                </div>

                {/* Address Collection */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--brikk-white)'
                  }}>
                    Business Address
                  </h3>
                  
                  {/* Street Address */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem'
                    }}>
                      Street Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <MapPin className="w-5 h-5" style={{ 
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--brikk-slate-text)'
                      }} />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your street address"
                        style={{
                          width: '100%',
                          padding: '1rem 1rem 1rem 3rem',
                          background: 'var(--brikk-dark-bg)',
                          border: `1px solid ${errors.address ? '#ef4444' : 'var(--brikk-card-border)'}`,
                          borderRadius: '8px',
                          color: 'var(--brikk-white)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => {
                          if (!errors.address) {
                            e.target.style.borderColor = 'var(--brikk-purple)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.address) {
                            e.target.style.borderColor = 'var(--brikk-card-border)';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* City, State, Zip Row */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 120px',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    {/* City */}
                    <div>
                      <label style={{ 
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '0.5rem'
                      }}>
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'var(--brikk-dark-bg)',
                          border: `1px solid ${errors.city ? '#ef4444' : 'var(--brikk-card-border)'}`,
                          borderRadius: '8px',
                          color: 'var(--brikk-white)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => {
                          if (!errors.city) {
                            e.target.style.borderColor = 'var(--brikk-purple)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.city) {
                            e.target.style.borderColor = 'var(--brikk-card-border)';
                          }
                        }}
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label style={{ 
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '0.5rem'
                      }}>
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'var(--brikk-dark-bg)',
                          border: `1px solid ${errors.state ? '#ef4444' : 'var(--brikk-card-border)'}`,
                          borderRadius: '8px',
                          color: 'var(--brikk-white)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => {
                          if (!errors.state) {
                            e.target.style.borderColor = 'var(--brikk-purple)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.state) {
                            e.target.style.borderColor = 'var(--brikk-card-border)';
                          }
                        }}
                      />
                    </div>

                    {/* Zip Code */}
                    <div>
                      <label style={{ 
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '0.5rem'
                      }}>
                        Zip Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="12345"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: 'var(--brikk-dark-bg)',
                          border: `1px solid ${errors.zipCode ? '#ef4444' : 'var(--brikk-card-border)'}`,
                          borderRadius: '8px',
                          color: 'var(--brikk-white)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => {
                          if (!errors.zipCode) {
                            e.target.style.borderColor = 'var(--brikk-purple)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.zipCode) {
                            e.target.style.borderColor = 'var(--brikk-card-border)';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem'
                    }}>
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'var(--brikk-dark-bg)',
                        border: `1px solid ${errors.country ? '#ef4444' : 'var(--brikk-card-border)'}`,
                        borderRadius: '8px',
                        color: 'var(--brikk-white)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        if (!errors.country) {
                          e.target.style.borderColor = 'var(--brikk-purple)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.country) {
                          e.target.style.borderColor = 'var(--brikk-card-border)';
                        }
                      }}
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="SG">Singapore</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                {/* Credit Card Section */}
                <div style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: formData.selectedPlan !== 'free' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(115, 95, 255, 0.05)',
                  border: formData.selectedPlan !== 'free' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(115, 95, 255, 0.2)',
                  borderRadius: '12px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: 'var(--brikk-white)'
                      }}>
                        Payment Information {formData.selectedPlan !== 'free' ? '(Required)' : '(Optional)'}
                      </h3>
                      <p style={{ 
                        fontSize: '0.875rem',
                        color: 'var(--brikk-slate-text)',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {formData.selectedPlan !== 'free' 
                          ? 'Payment method required for paid plans. You will be charged immediately upon account creation.'
                          : 'Add a payment method for seamless upgrades. No charges until you upgrade.'
                        }
                      </p>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'var(--brikk-slate-text)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <CreditCard className="w-4 h-4" />
                        We accept: Visa, Mastercard, American Express, Discover, Diners Club, JCB
                      </div>
                    </div>
                    {formData.selectedPlan === 'free' && (
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <input
                          type="checkbox"
                          id="addPayment"
                          checked={formData.addPayment}
                          onChange={(e) => handleInputChange('addPayment', e.target.checked)}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: 'var(--brikk-purple)'
                          }}
                        />
                        <label htmlFor="addPayment" style={{ 
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          Add payment method
                        </label>
                      </div>
                    )}
                  </div>

                  {(formData.addPayment || formData.selectedPlan !== 'free') && (
                    <div style={{ 
                      display: 'grid',
                      gap: '1rem'
                    }}>
                      {/* Credit Card Number */}
                      <div>
                        <label style={{ 
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          marginBottom: '0.5rem'
                        }}>
                          Card Number
                        </label>
                        <div style={{ position: 'relative' }}>
                          <CreditCard className="w-5 h-5" style={{ 
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--brikk-slate-text)'
                          }} />
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            style={{
                              width: '100%',
                              padding: '1rem 1rem 1rem 3rem',
                              background: 'var(--brikk-dark-bg)',
                              border: `1px solid ${errors.cardNumber ? '#ef4444' : 'var(--brikk-card-border)'}`,
                              borderRadius: '8px',
                              color: 'var(--brikk-white)',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => {
                              if (!errors.cardNumber) {
                                e.target.style.borderColor = 'var(--brikk-purple)';
                              }
                            }}
                            onBlur={(e) => {
                              if (!errors.cardNumber) {
                                e.target.style.borderColor = 'var(--brikk-card-border)';
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Expiry and CVC */}
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 120px',
                        gap: '1rem'
                      }}>
                        <div>
                          <label style={{ 
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                          }}>
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            placeholder="MM/YY"
                            style={{
                              width: '100%',
                              padding: '1rem',
                              background: 'var(--brikk-dark-bg)',
                              border: `1px solid ${errors.cardExpiry ? '#ef4444' : 'var(--brikk-card-border)'}`,
                              borderRadius: '8px',
                              color: 'var(--brikk-white)',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => {
                              if (!errors.cardExpiry) {
                                e.target.style.borderColor = 'var(--brikk-purple)';
                              }
                            }}
                            onBlur={(e) => {
                              if (!errors.cardExpiry) {
                                e.target.style.borderColor = 'var(--brikk-card-border)';
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ 
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                          }}>
                            CVC
                          </label>
                          <input
                            type="text"
                            value={formData.cardCvc}
                            onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                            placeholder="123"
                            style={{
                              width: '100%',
                              padding: '1rem',
                              background: 'var(--brikk-dark-bg)',
                              border: `1px solid ${errors.cardCvc ? '#ef4444' : 'var(--brikk-card-border)'}`,
                              borderRadius: '8px',
                              color: 'var(--brikk-white)',
                              fontSize: '1rem',
                              outline: 'none',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => {
                              if (!errors.cardCvc) {
                                e.target.style.borderColor = 'var(--brikk-purple)';
                              }
                            }}
                            onBlur={(e) => {
                              if (!errors.cardCvc) {
                                e.target.style.borderColor = 'var(--brikk-card-border)';
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: '#22c55e'
                      }}>
                        <Shield className="w-4 h-4" />
                        Your payment information is encrypted and secure. No charges until you upgrade.
                      </div>
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem'
                  }}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.submit}
                  </div>
                )}

                <div style={{ 
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: 'var(--brikk-slate-text)',
                      border: '1px solid var(--brikk-card-border)',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      flex: 2,
                      background: isLoading ? 'var(--brikk-slate-text)' : 'var(--brikk-gradient)',
                      color: 'var(--brikk-white)',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? 'Creating Account...' : (
                      formData.selectedPlan === 'free' ? 'Create Free Account' : `Create ${formData.selectedPlan.charAt(0).toUpperCase() + formData.selectedPlan.slice(1)} Account`
                    )}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            )}

            {/* Terms */}
            <p style={{ 
              fontSize: '0.75rem',
              color: 'var(--brikk-slate-text)',
              textAlign: 'center',
              marginTop: '1.5rem',
              lineHeight: '1.5'
            }}>
              By creating an account, you agree to our{' '}
              <button 
                onClick={() => setPolicyPopup({
                  isOpen: true,
                  type: 'terms',
                  title: 'Terms of Service',
                  content: (
                    <div>
                      <p><strong>Effective Date:</strong> January 1, 2025</p>
                      <p><strong>Last Updated:</strong> January 1, 2025</p>
                      
                      <h3>1. Acceptance of Terms</h3>
                      <p>By accessing or using the Brikk platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.</p>
                      
                      <h3>2. Description of Service</h3>
                      <p>Brikk provides an AI agent coordination platform that enables developers to connect and coordinate artificial intelligence agents across multiple programming languages. The Service includes API access, documentation, developer tools, and related services.</p>
                      
                      <h3>3. User Accounts</h3>
                      <p><strong>Account Creation:</strong> You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.</p>
                      
                      <h3>4. Acceptable Use Policy</h3>
                      <p>You may use the Service to develop and deploy AI agent coordination systems, access our APIs within your subscription limits, and integrate with supported programming languages. You may not use the Service to violate any applicable laws, infringe on intellectual property rights, or exceed your subscription limits without authorization.</p>
                      
                      <h3>5. Subscription Plans and Billing</h3>
                      <p>We offer Free, Paid, and Enterprise plans with different limits and features. All fees are non-refundable except as required by law. You may cancel your subscription at any time.</p>
                      
                      <h3>6. Limitation of Liability</h3>
                      <p>Our liability is limited to the amount you paid for the Service in the 12 months preceding the claim. We provide the Service "AS IS" without warranties.</p>
                      
                      <h3>7. Contact Information</h3>
                      <p>For questions about these Terms, contact us at legal@getbrikk.com</p>
                    </div>
                  )
                })}
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: 'var(--brikk-purple)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  padding: 0
                }}
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button 
                onClick={() => setPolicyPopup({
                  isOpen: true,
                  type: 'privacy',
                  title: 'Privacy Policy',
                  content: (
                    <div>
                      <p><strong>Effective Date:</strong> January 1, 2025</p>
                      <p><strong>Last Updated:</strong> January 1, 2025</p>
                      
                      <h3>1. Introduction</h3>
                      <p>Brikk Technologies, Inc. is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI agent coordination platform.</p>
                      
                      <h3>2. Information We Collect</h3>
                      <p><strong>Account Information:</strong> Name, email address, company name, billing address</p>
                      <p><strong>Usage Data:</strong> API calls, response times, error rates, and performance metrics</p>
                      <p><strong>Payment Information:</strong> Credit card details (processed securely through Stripe)</p>
                      
                      <h3>3. How We Use Your Information</h3>
                      <p>We use your information to provide and maintain the Brikk platform, process API requests, manage your account and subscriptions, and improve our services.</p>
                      
                      <h3>4. Data Security</h3>
                      <p>We implement enterprise-grade security measures including encryption, access controls, and regular security audits. We are designed to meet HIPAA and SOC 2 compliance requirements.</p>
                      
                      <h3>5. Data Retention</h3>
                      <p>We retain your data for as long as your account is active or as needed to provide services. You may request data deletion at any time.</p>
                      
                      <h3>6. Your Rights</h3>
                      <p>You have the right to access, update, or delete your personal information. Contact us at privacy@getbrikk.com for data requests.</p>
                      
                      <h3>7. Contact Information</h3>
                      <p>For questions about this Privacy Policy, contact us at privacy@getbrikk.com</p>
                    </div>
                  )
                })}
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: 'var(--brikk-purple)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  padding: 0
                }}
              >
                Privacy Policy
              </button>.
            </p>
          </div>
        </div>
      </div>
      
      <PolicyPopup
        isOpen={policyPopup.isOpen}
        onClose={() => setPolicyPopup({ isOpen: false, type: '', title: '', content: '' })}
        type={policyPopup.type}
        title={policyPopup.title}
        content={policyPopup.content}
      />
    </div>
  );
};

export default FreeTierSignup;

