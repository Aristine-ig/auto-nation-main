import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const { userId } = req.auth;
    
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        subscription: true,
        integrations: true
      }
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: req.auth.sessionClaims?.email || '',
          firstName: req.auth.sessionClaims?.firstName || null,
          lastName: req.auth.sessionClaims?.lastName || null
        },
        include: {
          subscription: true,
          integrations: true
        }
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { firstName, lastName, email } = req.body;
    
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        firstName,
        lastName,
        email
      },
      include: {
        subscription: true,
        integrations: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;