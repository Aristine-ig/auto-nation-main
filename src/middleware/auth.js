import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Custom auth middleware that adds user context
export const requireAuth = ClerkExpressRequireAuth();

// Middleware to get user from database
export const getUserContext = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Add userId to request for easy access
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};