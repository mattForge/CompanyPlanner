import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { jwt } from 'hono/jwt';
import jwt from 'jsonwebtoken';

const app = new Hono();
const prisma = new PrismaClient();

app.use('*', jwt({ 
  secret: process.env.JWT_SECRET 
}));

app.post('/', async (c) => {
  const user = c.get('user');
  
  if (user.role !== 'GLOBAL_ADMIN') {
    return c.json({ error: 'Forbidden' }, 403);
  }

  const { name } = await c.req.json();
  const company = await prisma.company.create({
    data: { name }
  });

  return c.json(company);
});

app.get('/', async (c) => {
  const user = c.get('user');
  if (user.role !== 'GLOBAL_ADMIN') {
    return c.json({ error: 'Forbidden' }, 403);
  }

  const companies = await prisma.company.findMany({
    include: { teams: true }
  });
  return c.json(companies);
});

export default app;
