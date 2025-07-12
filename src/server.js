import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AutoNation API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api/v1/status', (req, res) => {
  res.json({
    message: 'AutoNation API v1.0',
    status: 'active',
    features: [
      'Instagram automation',
      'User management',
      'Subscription handling',
      'Analytics'
    ]
  });
});

// Protected routes (require authentication)
app.use('/api/v1/protected', ClerkExpressRequireAuth());

// User routes
app.get('/api/v1/protected/user', async (req, res) => {
  try {
    const { userId } = req.auth;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        subscription: true,
        integrations: true,
        automations: {
          include: {
            trigger: true,
            listener: true,
            keywords: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Automation routes
app.get('/api/v1/protected/automations', async (req, res) => {
  try {
    const { userId } = req.auth;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const automations = await prisma.automation.findMany({
      where: { userId: user.id },
      include: {
        trigger: true,
        listener: true,
        keywords: true,
        posts: true,
        dms: true
      }
    });

    res.json(automations);
  } catch (error) {
    console.error('Error fetching automations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/protected/automations', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { name, keywords, listenerType, prompt, commentReply } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const automation = await prisma.automation.create({
      data: {
        name: name || 'Untitled Automation',
        userId: user.id,
        listener: {
          create: {
            listener: listenerType || 'MESSAGE',
            prompt: prompt || '',
            commentReply: commentReply || ''
          }
        },
        keywords: {
          create: keywords?.map(word => ({ word })) || []
        }
      },
      include: {
        listener: true,
        keywords: true
      }
    });

    res.status(201).json(automation);
  } catch (error) {
    console.error('Error creating automation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Integration routes
app.get('/api/v1/protected/integrations', async (req, res) => {
  try {
    const { userId } = req.auth;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const integrations = await prisma.integrations.findMany({
      where: { userId: user.id }
    });

    res.json(integrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics endpoint
app.get('/api/v1/protected/analytics', async (req, res) => {
  try {
    const { userId } = req.auth;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get analytics data
    const totalAutomations = await prisma.automation.count({
      where: { userId: user.id }
    });

    const activeAutomations = await prisma.automation.count({
      where: { userId: user.id, active: true }
    });

    const totalDMs = await prisma.dms.count({
      where: {
        automation: {
          userId: user.id
        }
      }
    });

    const totalPosts = await prisma.post.count({
      where: {
        automation: {
          userId: user.id
        }
      }
    });

    res.json({
      totalAutomations,
      activeAutomations,
      totalDMs,
      totalPosts,
      responseRate: totalDMs > 0 ? Math.round((totalDMs / (totalDMs + totalPosts)) * 100) : 0
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AutoNation API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Status: http://localhost:${PORT}/api/v1/status`);
});

export default app;