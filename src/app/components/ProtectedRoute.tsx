// src/components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRoles }: { 
  children: React.ReactNode, 
  requiredRoles?: ('STUDENT' | 'INSTRUCTOR' | 'ADMIN')[] 
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
      } else if (requiredRoles && !requiredRoles.includes(user.role)) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, requiredRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
}