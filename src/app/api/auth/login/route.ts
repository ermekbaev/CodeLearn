import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signJwtToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Базовая валидация
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' }, 
        { status: 400 }
      );
    }
    
    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' }, 
        { status: 401 }
      );
    }
    
    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' }, 
        { status: 401 }
      );
    }
    
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
    console.error('Ошибка входа:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при входе' }, 
      { status: 500 }
    );
  }
}