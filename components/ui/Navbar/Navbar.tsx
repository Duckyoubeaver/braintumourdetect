import AccountDropdown from './Account';
import s from './Navbar.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import SignOutButton from './SignOutButton';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="bg-white text-black transition-all duration-150">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="w-screen  mx-auto">
        {/* <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" /> */}
        <div
          className={`top-0 sticky px-6 relative flex flex-row justify-between py-0 align-center md:py-0 bg`}
        >
          <div className="flex items-center flex-1">
            {/* <Hamburger /> */}
            <Link href="/" className={` text-sm mr-3 `} aria-label="Logo">
              <div className="flex items-center">
                <span className={`${s.title} p-2 organization-name`}>
                  <Logo />
                  <p className={`${s.logos} p-2 my-1`}>NeuroVision</p>
                </span>
              </div>
            </Link>
            <div className="border-l h-12 border-gray-100 mx-2"></div>
            <div className="hidden space-x-0 mx-3 lg:block">
              {user && (
                <Link
                  href="/patients"
                  className={`${s.link}`}
                  title="Click this button to go to the patients page"
                >
                  Patients
                </Link>
              )}

              {user && (
                <Link
                  href="/documentation/introduction"
                  className={`${s.link}`}
                  title="Click this button to go to the documentation page"
                >
                  Documentation
                </Link>
              )}
            </div>
            {user && <div className="border-l h-12 border-gray-100 mx-2"></div>}
          </div>
          <div className="border-l h-12 border-gray-100 mx-2"></div>
          <div className="flex justify-between pt-1">
            <div className="flex items-center">
              <div className="flex justify-end flex-1 space-x-8">
                {user ? (
                  <SignOutButton />
                ) : (
                  <Link
                    href="/signin"
                    className={`${s.link}`}
                    title="Click this button to sign in"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
      </div>
    </nav>
  );
}
