// Import necessary modules and styles
'use client';

import s from './Navbar.module.css';
import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

// Define the SignOutButton component
export default function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();

  // Handle sign-out functionality
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // Render the button with the appropriate styles
  //Log
  return (
    <button
      className={`${s.link} text-xs`} // Use the same styles as the navbar links
      onClick={handleSignOut}
    >
      Log Out
    </button>
  );
}
