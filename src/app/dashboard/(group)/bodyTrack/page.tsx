import { redirect } from 'next/navigation';

export default function BodyTrackPage() {
  redirect('/dashboard/bodyTrack/BMI');
  return null;
}