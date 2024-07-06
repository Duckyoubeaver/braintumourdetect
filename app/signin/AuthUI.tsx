'use client';

import { useSupabase } from '@/app/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';

export default function AuthUI() {
  const { supabase } = useSupabase();

  useEffect(() => {
    const hideForgotPasswordLink = () => {
      const forgotPasswordLink = document.querySelector(
        'a[href="#auth-forgot-password"]'
      ) as HTMLElement;
      if (forgotPasswordLink) {
        forgotPasswordLink.style.display = 'none';
      }
    };

    // Hide the link on initial render and when the component is updated
    hideForgotPasswordLink();

    // Mutation observer to handle dynamic changes if the element is added later
    const observer = new MutationObserver(hideForgotPasswordLink);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        redirectTo={`${getURL()}/auth/callback`}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2d6ded',
                brandAccent: '#2d6ded'
              }
            }
          }
        }}
        theme="light"
      />
    </div>
  );
}
