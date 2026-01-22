import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = new Hono();
const prisma = new PrismaClient();

app.post('/', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true, team: true }
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return c.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        companyId: user.companyId,
        teamId: user.teamId 
      } 
    });
  } catch (error) {
    return c.json({ error: 'Server error' }, 500);
  }
});

export default app;
