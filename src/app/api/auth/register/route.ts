import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signJwtToken } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, avatar  } = await req.json();
    
    // Базовая валидация
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Имя, email и пароль обязательны' }, 
        { status: 400 }
      );
    }
    
    // Проверка на существующий email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' }, 
        { status: 400 }
      );
    }
    
    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'STUDENT' as keyof typeof UserRole,
        avatar: avatar || null
      },
      select: {  
        id: true,
        name: true,
        email: true,
        role: true,  
        password: true,  
        avatar: true
      }
    });
    
    // Генерация JWT токена
    const token = signJwtToken({ 
      userId: user.id, 
      email: user.email 
    });
    
    return NextResponse.json({ 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      },
      token 
    });
    
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при регистрации' }, 
      { status: 500 }
    );
  }
}