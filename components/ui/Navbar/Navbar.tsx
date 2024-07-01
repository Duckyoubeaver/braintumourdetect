import AccountDropdown from './Account';
import s from './Navbar.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import ImageUpload from '@/components/Upload';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

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
              {/* {user && (
                <Link href="/scans" className={`${s.link}`}>
                  Scans
                </Link>
              )} */}

              {user && (
                <Link href="/patients" className={`${s.link}`}>
                  Patients
                </Link>
              )}

              {user && (
                <Link href="/documentation" className={`${s.link}`}>
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
                  <AccountDropdown />
                ) : (
                  <Link href="/signin" className={`${s.link}`}>
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
