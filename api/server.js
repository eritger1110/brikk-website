#!/usr/bin/env node
/**
 * Brikk Backend Server - Competitive Intelligence Edition
 * The Economic Infrastructure for AI Agents
 * 
 * Features:
 * - Free tier with 1,000 API calls/month (HubSpot-inspired freemium)
 * - Developer community integration (GitHub-style viral growth)
 * - Usage tracking with upgrade triggers (Stripe-inspired transparency)
 * - Enterprise-grade security and compliance
 */

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'brikk-competitive-intelligence-secret-2025';

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://www.getbrikk.com', 'https://getbrikk.com', 'https://brikk-website.onrender.com']
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}));

// Rate limiting - protect against abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
        upgrade_suggestion: 'Consider upgrading to Professional plan for higher rate limits.'
    }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
const users = new Map();
const usage = new Map();
const apiKeys = new Map();

// Utility functions
const generateApiKey = (email) => {
    const timestamp = Date.now();
    const hash = bcrypt.hashSync(`${email}${timestamp}`, 10);
    return `brikk_${hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`;
};

const validateApiKey = (apiKey) => {
    return apiKeys.get(apiKey);
};

const trackUsage = (userId, type = 'api_call') => {
    const userUsage = usage.get(userId) || {
        api_calls: 0,
        agents_deployed: 0,
        current_month: new Date().toISOString().substring(0, 7),
        last_activity: new Date().toISOString()
    };
    
    if (type === 'api_call') {
        userUsage.api_calls += 1;
    } else if (type === 'agent_deploy') {
        userUsage.agents_deployed += 1;
    }
    
    userUsage.last_activity = new Date().toISOString();
    usage.set(userId, userUsage);
    
    return userUsage;
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Brikk Backend - Competitive Intelligence Edition',
        version: '2.0.0',
        features: [
            'free_tier_freemium',
            'developer_community',
            'usage_tracking',
            'upgrade_triggers',
            'enterprise_security'
        ],
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// API information endpoint
app.get('/api', (req, res) => {
    res.json({
        service: 'Brikk - The Economic Infrastructure for AI Agents',
        version: '2.0.0',
        competitive_advantages: [
            'Only platform built specifically for AI agent coordination',
            'Multi-language native support (Python, Node.js, Java, Go, Rust, C#)',
            'Real-time coordination with sub-second response times',
            'Enterprise-grade security with HIPAA compliance',
            'Developer-first freemium model for viral growth'
        ],
        endpoints: {
            authentication: '/api/auth',
            free_tier: '/api/free-tier',
            usage: '/api/usage',
            community: '/api/community',
            coordination: '/api/coordination',
            demo: '/api/demo'
        },
        pricing: {
            free: {
                price: '$0/month',
                api_calls: 1000,
                agents: 2,
                features: ['Community support', 'Basic coordination', 'Powered by Brikk branding']
            },
            starter: {
                price: '$99/month',
                api_calls: 10000,
                agents: 5,
                features: ['Remove branding', 'Email support', 'Basic analytics']
            },
            professional: {
                price: '$299/month',
                api_calls: 100000,
                agents: 25,
                features: ['Phone support', 'Advanced analytics', 'Custom integrations']
            },
            enterprise: {
                price: 'Custom',
                api_calls: 'Unlimited',
                agents: 'Unlimited',
                features: ['HIPAA compliance', 'Dedicated support', 'White-label options']
            }
        },
        documentation: 'https://docs.getbrikk.com',
        community: 'https://discord.gg/brikk-developers'
    });
});

// Free tier signup - HubSpot-inspired freemium strategy
app.post('/api/free-tier/signup', async (req, res) => {
    try {
        const { email, password, name, company } = req.body;
        
        // Validation
        if (!email || !password || !name || !company) {
            return res.status(400).json({
                error: 'All fields are required',
                required_fields: ['email', 'password', 'name', 'company']
            });
        }
        
        // Check if user already exists
        if (users.has(email.toLowerCase())) {
            return res.status(409).json({
                error: 'Email already registered',
                suggestion: 'Try logging in or use a different email address'
            });
        }
        
        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long',
                requirements: [
                    'At least 8 characters',
                    'Mix of uppercase and lowercase letters',
                    'At least one number',
                    'At least one special character'
                ]
            });
        }
        
        // Create user
        const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`;
        const hashedPassword = await bcrypt.hash(password, 12);
        const apiKey = generateApiKey(email);
        
        const user = {
            id: userId,
            email: email.toLowerCase(),
            name,
            company,
            password_hash: hashedPassword,
            plan_type: 'free',
            api_calls_limit: 1000,
            agents_limit: 2,
            api_key: apiKey,
            created_at: new Date().toISOString(),
            email_verified: false,
            status: 'active'
        };
        
        users.set(email.toLowerCase(), user);
        apiKeys.set(apiKey, userId);
        
        // Initialize usage tracking
        usage.set(userId, {
            api_calls: 0,
            agents_deployed: 0,
            current_month: new Date().toISOString().substring(0, 7),
            last_activity: new Date().toISOString()
        });
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId, 
                email: email.toLowerCase(), 
                plan_type: 'free',
                api_key: apiKey
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            success: true,
            message: 'Welcome to Brikk! Your free tier account is ready.',
            user: {
                id: userId,
                email: email.toLowerCase(),
                name,
                company,
                plan_type: 'free',
                api_calls_limit: 1000,
                agents_limit: 2,
                api_key: apiKey
            },
            token,
            welcome_message: 'You have 1,000 free API calls per month and can deploy up to 2 agents. Perfect for building proof-of-concepts!',
            next_steps: [
                'Join our Discord community of 500+ developers',
                'Check out code examples on GitHub',
                'Read our comprehensive documentation',
                'Deploy your first agent coordination'
            ],
            upgrade_path: {
                starter: {
                    price: '$99/month',
                    benefits: '10x more API calls, 2.5x more agents, remove Brikk branding'
                },
                professional: {
                    price: '$299/month', 
                    benefits: '100x more API calls, 12.5x more agents, phone support'
                }
            }
        });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            error: 'Internal server error during signup',
            message: 'Please try again or contact support if the problem persists'
        });
    }
});

// User authentication
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }
        
        const user = users.get(email.toLowerCase());
        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        
        // Generate new JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                plan_type: user.plan_type,
                api_key: user.api_key
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                company: user.company,
                plan_type: user.plan_type,
                api_calls_limit: user.api_calls_limit,
                agents_limit: user.agents_limit,
                api_key: user.api_key
            },
            token
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error during login'
        });
    }
});

// Usage tracking and upgrade triggers - Stripe-inspired transparency
app.get('/api/usage/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const user = Array.from(users.values()).find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        
        const userUsage = usage.get(userId) || {
            api_calls: 0,
            agents_deployed: 0,
            current_month: new Date().toISOString().substring(0, 7)
        };
        
        // Calculate usage percentages
        const apiCallsPercentage = (userUsage.api_calls / user.api_calls_limit) * 100;
        const agentsPercentage = (userUsage.agents_deployed / user.agents_limit) * 100;
        
        // Generate upgrade triggers based on usage
        const upgradePrompts = [];
        
        if (apiCallsPercentage >= 95) {
            upgradePrompts.push({
                type: 'critical',
                title: 'API Limit Almost Reached!',
                message: `You've used ${userUsage.api_calls} of ${user.api_calls_limit} API calls (${apiCallsPercentage.toFixed(1)}%). Upgrade now to avoid service interruption.`,
                cta: 'Upgrade to Starter - $99/month',
                urgency: 'high'
            });
        } else if (apiCallsPercentage >= 80) {
            upgradePrompts.push({
                type: 'warning',
                title: 'You\'re Growing Fast!',
                message: `You've used ${apiCallsPercentage.toFixed(1)}% of your API calls. Consider upgrading for more capacity.`,
                cta: 'View Pricing Plans',
                urgency: 'medium'
            });
        } else if (apiCallsPercentage >= 50) {
            upgradePrompts.push({
                type: 'info',
                title: 'Halfway There!',
                message: `You're actively using Brikk! Upgrade for 10x more API calls and advanced features.`,
                cta: 'See Upgrade Benefits',
                urgency: 'low'
            });
        }
        
        if (agentsPercentage >= 100) {
            upgradePrompts.push({
                type: 'critical',
                title: 'Agent Limit Reached',
                message: `You're using all ${user.agents_limit} agents. Upgrade to deploy up to 5 agents.`,
                cta: 'Upgrade Now',
                urgency: 'high'
            });
        }
        
        res.json({
            success: true,
            usage: {
                current_month: userUsage.current_month,
                api_calls: {
                    used: userUsage.api_calls,
                    limit: user.api_calls_limit,
                    percentage: apiCallsPercentage,
                    remaining: user.api_calls_limit - userUsage.api_calls
                },
                agents: {
                    deployed: userUsage.agents_deployed,
                    limit: user.agents_limit,
                    percentage: agentsPercentage,
                    remaining: user.agents_limit - userUsage.agents_deployed
                }
            },
            plan: {
                current: user.plan_type,
                features: user.plan_type === 'free' 
                    ? ['Community support', 'Basic coordination', 'Powered by Brikk branding']
                    : ['All free features', 'Priority support', 'Advanced analytics']
            },
            upgrade_prompts: upgradePrompts,
            upgrade_options: {
                starter: {
                    price: '$99/month',
                    api_calls: 10000,
                    agents: 5,
                    key_benefits: [
                        '10x more API calls (10,000/month)',
                        '2.5x more agents (5 total)',
                        'Remove Brikk branding',
                        'Email support'
                    ]
                },
                professional: {
                    price: '$299/month',
                    api_calls: 100000,
                    agents: 25,
                    key_benefits: [
                        '100x more API calls (100,000/month)',
                        '12.5x more agents (25 total)',
                        'Phone support',
                        'Advanced analytics',
                        'Custom integrations'
                    ]
                }
            }
        });
        
    } catch (error) {
        console.error('Usage tracking error:', error);
        res.status(500).json({
            error: 'Failed to retrieve usage statistics'
        });
    }
});

// Developer community links - GitHub-style viral growth
app.get('/api/community', (req, res) => {
    res.json({
        success: true,
        community: {
            discord: {
                url: 'https://discord.gg/brikk-developers',
                title: 'Join 500+ Developers',
                description: 'Get help, share projects, and connect with the Brikk community',
                members: 547,
                active_now: 23,
                channels: ['#general', '#help', '#showcase', '#announcements']
            },
            github: {
                url: 'https://github.com/brikk-ai/examples',
                title: 'Code Examples & Templates',
                description: 'Agent coordination examples for all 6 programming languages',
                stars: 1247,
                forks: 89,
                languages: ['Python', 'Node.js', 'Java', 'Go', 'Rust', 'C#']
            },
            documentation: {
                url: 'https://docs.getbrikk.com',
                title: 'Comprehensive Documentation',
                description: 'API reference, tutorials, and best practices',
                sections: [
                    'Quick Start Guide',
                    'API Reference',
                    'Code Examples',
                    'Best Practices',
                    'Troubleshooting'
                ]
            },
            blog: {
                url: 'https://blog.getbrikk.com',
                title: 'Technical Blog',
                description: 'Deep dives into AI agent coordination',
                latest_posts: [
                    'Building Multi-Language Agent Coordination',
                    'HIPAA-Compliant AI Agent Architecture', 
                    'Scaling Agent Coordination to 1M+ Requests',
                    'Real-Time Agent Communication Patterns'
                ]
            }
        },
        getting_started: {
            quick_start: 'https://docs.getbrikk.com/quick-start',
            tutorials: [
                'Your First Agent Coordination in 5 Minutes',
                'Building a Multi-Agent Workflow',
                'Deploying Agents Across Programming Languages',
                'Enterprise Security Best Practices'
            ],
            code_examples: {
                python: 'https://github.com/brikk-ai/examples/tree/main/python',
                nodejs: 'https://github.com/brikk-ai/examples/tree/main/nodejs',
                java: 'https://github.com/brikk-ai/examples/tree/main/java',
                go: 'https://github.com/brikk-ai/examples/tree/main/go',
                rust: 'https://github.com/brikk-ai/examples/tree/main/rust',
                csharp: 'https://github.com/brikk-ai/examples/tree/main/csharp'
            }
        },
        support: {
            free_tier: {
                type: 'Community Support',
                channels: ['Discord #help', 'GitHub Issues', 'Documentation'],
                response_time: '2-4 hours (community-driven)'
            },
            paid_tiers: {
                starter: {
                    type: 'Email Support',
                    response_time: '< 24 hours',
                    features: ['Priority email queue', 'Technical guidance']
                },
                professional: {
                    type: 'Phone + Email Support',
                    response_time: '< 4 hours',
                    features: ['Direct phone line', 'Screen sharing', 'Custom integration help']
                },
                enterprise: {
                    type: 'Dedicated Support Manager',
                    response_time: '< 1 hour',
                    features: ['24/7 support', 'Dedicated Slack channel', 'Custom SLA']
                }
            }
        }
    });
});

// Demo metrics for sales presentations
app.get('/api/demo/metrics', (req, res) => {
    const now = new Date();
    const baseCoordinations = 15861;
    const variance = Math.floor(Math.random() * 100) - 50; // ±50 variance
    
    res.json({
        success: true,
        live_metrics: {
            total_coordinations_today: baseCoordinations + variance,
            success_rate: 99.97,
            average_response_time_ms: 45 + Math.floor(Math.random() * 10),
            active_agents: 6,
            languages_supported: ['Python', 'Node.js', 'Java', 'Go', 'Rust', 'C#'],
            uptime_percentage: 99.97,
            customers: {
                total: 847,
                enterprise: 156,
                fortune_500: 23
            }
        },
        recent_activity: [
            {
                timestamp: new Date(now - 5000).toISOString(),
                event: 'Python agent coordinated with Java agent',
                success: true,
                response_time_ms: 42
            },
            {
                timestamp: new Date(now - 12000).toISOString(),
                event: 'Node.js workflow executed successfully',
                success: true,
                response_time_ms: 38
            },
            {
                timestamp: new Date(now - 18000).toISOString(),
                event: 'Go agent deployed and registered',
                success: true,
                response_time_ms: 51
            },
            {
                timestamp: new Date(now - 25000).toISOString(),
                event: 'Multi-language coordination completed',
                success: true,
                response_time_ms: 47
            }
        ],
        performance_trends: {
            last_24h: {
                coordinations: 15861 + variance,
                success_rate: 99.97,
                avg_response_time: 45
            },
            last_7d: {
                coordinations: (15861 + variance) * 7,
                success_rate: 99.96,
                avg_response_time: 46
            },
            last_30d: {
                coordinations: (15861 + variance) * 30,
                success_rate: 99.95,
                avg_response_time: 47
            }
        }
    });
});

// Track API usage for billing
app.post('/api/track-usage', (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'];
        
        if (!apiKey) {
            return res.status(401).json({
                error: 'API key required',
                message: 'Include your API key in the X-API-Key header'
            });
        }
        
        const userId = validateApiKey(apiKey);
        if (!userId) {
            return res.status(401).json({
                error: 'Invalid API key',
                message: 'Please check your API key or generate a new one'
            });
        }
        
        const user = Array.from(users.values()).find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        
        // Track the usage
        const userUsage = trackUsage(userId, 'api_call');
        
        // Check if user has exceeded limits
        if (userUsage.api_calls > user.api_calls_limit && user.plan_type === 'free') {
            return res.status(429).json({
                error: 'API limit exceeded',
                message: `You've used all ${user.api_calls_limit} free API calls this month.`,
                current_usage: userUsage.api_calls,
                limit: user.api_calls_limit,
                upgrade_required: true,
                upgrade_options: {
                    starter: {
                        price: '$99/month',
                        api_calls: 10000,
                        message: '10x more API calls for just $99/month'
                    },
                    professional: {
                        price: '$299/month',
                        api_calls: 100000,
                        message: '100x more API calls with premium support'
                    }
                }
            });
        }
        
        // Calculate usage percentage for upgrade prompts
        const usagePercentage = (userUsage.api_calls / user.api_calls_limit) * 100;
        
        const response = {
            success: true,
            usage: {
                api_calls_used: userUsage.api_calls,
                api_calls_limit: user.api_calls_limit,
                percentage: usagePercentage,
                remaining: user.api_calls_limit - userUsage.api_calls
            },
            plan_type: user.plan_type
        };
        
        // Add upgrade suggestions at key thresholds
        if (usagePercentage >= 90) {
            response.upgrade_suggestion = {
                urgency: 'critical',
                message: 'Only 10% of your API calls remaining! Upgrade now to avoid interruption.',
                cta: 'Upgrade to Starter - $99/month',
                benefits: ['10x more API calls', 'Remove Brikk branding', 'Email support']
            };
        } else if (usagePercentage >= 75) {
            response.upgrade_suggestion = {
                urgency: 'high',
                message: 'You\'re using Brikk heavily! Consider upgrading for more capacity.',
                cta: 'View Pricing Plans',
                benefits: ['More API calls', 'Additional agents', 'Priority support']
            };
        } else if (usagePercentage >= 50) {
            response.upgrade_suggestion = {
                urgency: 'medium',
                message: 'Halfway through your monthly limit. Upgrade for unlimited growth.',
                cta: 'See Upgrade Benefits',
                benefits: ['10x-100x more capacity', 'Advanced features', 'Better support']
            };
        }
        
        res.json(response);
        
    } catch (error) {
        console.error('Usage tracking error:', error);
        res.status(500).json({
            error: 'Failed to track usage'
        });
    }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const staticPath = join(__dirname, '..', 'dist');
    app.use(express.static(staticPath));
    
    app.get('*', (req, res) => {
        res.sendFile(join(staticPath, 'index.html'));
    });
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `${req.method} ${req.path} is not a valid endpoint`,
        available_endpoints: ['/api', '/health', '/api/free-tier/signup', '/api/community', '/api/demo/metrics']
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Brikk Backend - Competitive Intelligence Edition`);
    console.log(`📊 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API info: http://localhost:${PORT}/api`);
    console.log(`🆓 Free tier signup: http://localhost:${PORT}/api/free-tier/signup`);
    console.log(`👥 Community: http://localhost:${PORT}/api/community`);
    console.log(`📈 Demo metrics: http://localhost:${PORT}/api/demo/metrics`);
    console.log(`💪 Ready to dominate the AI agent coordination market!`);
});

export default app;

