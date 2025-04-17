import * as jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function signJwtToken(payload: { userId: string; email: string }): string {
  //@ts-ignore
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    //@ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

export async function getCurrentUser(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  
  const payload = verifyJwtToken(token);
  if (!payload) return null;
  
  return payload;
}