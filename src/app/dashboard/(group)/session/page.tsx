import { redirect } from 'next/navigation';

export default function SessionPage() {
  redirect('/dashboard/session/today');
  return null;
}
