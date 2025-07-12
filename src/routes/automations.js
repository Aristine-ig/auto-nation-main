import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all automations for user
router.get('/', async (req, res) => {
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
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(automations);
  } catch (error) {
    console.error('Error fetching automations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new automation
router.post('/', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { name, keywords, listenerType, prompt, commentReply, triggerType } = req.body;
    
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
        trigger: triggerType ? {
          create: {
            type: triggerType
          }
        } : undefined,
        keywords: {
          create: keywords?.map(word => ({ word })) || []
        }
      },
      include: {
        listener: true,
        trigger: true,
        keywords: true
      }
    });

    res.status(201).json(automation);
  } catch (error) {
    console.error('Error creating automation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific automation
router.get('/:id', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const automation = await prisma.automation.findFirst({
      where: { 
        id,
        userId: user.id 
      },
      include: {
        trigger: true,
        listener: true,
        keywords: true,
        posts: true,
        dms: true
      }
    });

    if (!automation) {
      return res.status(404).json({ error: 'Automation not found' });
    }

    res.json(automation);
  } catch (error) {
    console.error('Error fetching automation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update automation
router.put('/:id', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    const { name, active, keywords, prompt, commentReply } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update automation
    const automation = await prisma.automation.update({
      where: { 
        id,
        userId: user.id 
      },
      data: {
        name,
        active
      }
    });

    // Update listener if provided
    if (prompt !== undefined || commentReply !== undefined) {
      await prisma.listener.updateMany({
        where: { automationId: id },
        data: {
          prompt,
          commentReply
        }
      });
    }

    // Update keywords if provided
    if (keywords) {
      // Delete existing keywords
      await prisma.keyword.deleteMany({
        where: { automationId: id }
      });
      
      // Create new keywords
      if (keywords.length > 0) {
        await prisma.keyword.createMany({
          data: keywords.map(word => ({
            word,
            automationId: id
          }))
        });
      }
    }

    // Fetch updated automation
    const updatedAutomation = await prisma.automation.findUnique({
      where: { id },
      include: {
        trigger: true,
        listener: true,
        keywords: true
      }
    });

    res.json(updatedAutomation);
  } catch (error) {
    console.error('Error updating automation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete automation
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.automation.delete({
      where: { 
        id,
        userId: user.id 
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting automation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;