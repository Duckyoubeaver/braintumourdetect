import AccountDropdown from './Account';
import s from './Navbar.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import Hamburger from './Hamburger';

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
        <div className="px-6 flex justify-between pt-1">
          <div className="flex items-center">
            <span className={`${s.link} text-sm p-2 organization-name`}>
              <Link
                href="/"
                className={`${s.logo} text-sm mr-3 `}
                aria-label="Logo"
              >
                <Logo />
              </Link>
              Organisation Name
            </span>
          </div>

          <div className="flex items-center">
            <button className={`${s.link} text-xs`}>Help</button>

            {/* <button className={`${s.feedback} text-xs`}>Feedback</button> */}

            <div className="border-l h-8 border-gray-100 mx-2"></div>

            <div className="flex justify-end flex-1 space-x-8">
              {user ? (
                <AccountDropdown />
              ) : (
                <Link href="/signin" className={`${s.link} text-sm`}>
                  Sign in
                </Link>
                //signin
              )}
            </div>
          </div>
        </div>
        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
        <div
          className={`top-0 sticky px-6 relative flex flex-row justify-between py-0 align-center md:py-0 bg`}
        >
          <div className="flex items-center flex-1">
            <button className={`${s.arrow} ${s.button} text-sm`} title="Search">
              <GoSearch />
            </button>

            {/* change it not into a link but a button */}
            <div className="border-l h-8 border-gray-100 mx-2"></div>

            <div className="hidden space-x-0 lg:block">
              {/* {user && <button className={`${s.link} text-xs`}>Home</button>} */}
              {user && (
                <Link href="/report" className={`${s.link} text-xs`}>
                  Settings
                </Link>
              )}
              {user && (
                <Link href="/report" className={`${s.link} text-xs`}>
                  Roster
                </Link>
              )}
              {user && (
                <Link href="/report" className={`${s.link} text-xs`}>
                  Payroll
                </Link>
              )}
              {user && (
                <Link href="/report" className={`${s.link} text-xs`}>
                  Analysis
                </Link>
              )}
              {user && (
                <Link href="/report" className={`${s.link} text-xs`}>
                  Share
                </Link>
              )}
            </div>

            <div className="border-l h-8 border-gray-100 mx-2"></div>
          </div>
          <Hamburger />

          {/* <div className="border-l h-8 border-gray-100 mx-2"></div> */}
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
      </div>
    </nav>
  );
}
