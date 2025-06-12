// filepath: app/actions/authActions.ts
'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'auth-token'; // Consistent cookie name

export async function setAuthCookieAction(token: string) {
  if (!token || typeof token !== 'string') {
    return { success: false, message: 'Invalid token.' };
  }
  try {
    (await cookies()).set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // Ví dụ: 7 ngày
    });
    return { success: true, message: 'Auth cookie set successfully.' };
  } catch (error) {
    console.error('setAuthCookieAction Error:', error);
    return { success: false, message: 'Failed to set auth cookie.' };
  }
}

export async function clearAuthCookieAction() {
  try {
    (await cookies()).set(AUTH_COOKIE_NAME, '', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true, message: 'Auth cookie cleared successfully.' };
  } catch (error) {
    console.error('clearAuthCookieAction Error:', error);
    return { success: false, message: 'Failed to clear auth cookie.' };
  }
}

export async function setRoleUserCookieAction(role: string) {
  if (!role || typeof role !== 'string') {
    return { success: false, message: 'Invalid role.' };
  }
  try {
    (await cookies()).set('role-user', role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // Ví dụ: 7 ngày
    });
    return { success: true, message: 'Role cookie set successfully.' };
  } catch (error) {
    console.error('setRoleUserCookieAction Error:', error);
    return { success: false, message: 'Failed to set role cookie.' };
  }
}