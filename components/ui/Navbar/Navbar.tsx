import AccountDropdown from './Account';
import s from './Navbar.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

//Use server component here, but where client side interaction is needded use a client component

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className=" sticky top-0 z-40 bg-white text-black transition-all duration-150">
      {/* <nav className="bg-white text-black transition-all duration-150"> */}
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

          <div className="flex items-center space-x-4">
            {/* <div className={`${s.searchContainer}`}>
              <input
                type="text"
                placeholder="Search..."
                className={`${s.search}`}
              />
              <div className={`${s.iconContainer}`}>
                <span className={`${s.commandIcon}`}>⌘ K</span>
              </div>
            </div> */}

            <button className={`${s.feedback} text-sm`}>Feedback</button>

            <button className={`${s.upgrade} text-sm`}>Upgrade</button>

            <div className="flex justify-end flex-1 space-x-8">
              {user ? (
                <AccountDropdown />
              ) : (
                <Link href="/signin" className={`${s.link} text-sm`}>
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
        <div
          className={`top-0 sticky px-6 relative flex flex-row justify-between py-0 align-center md:py-0 bg`}
        >
          <div className="flex items-center flex-1">
            <div className="hidden space-x-2 lg:block">
              {user && (
                <Link href="/overview" className={`${s.link} text-sm`}>
                  Overview
                </Link>
              )}
              {user && (
                <Link href="/reporting" className={`${s.link} text-sm`}>
                  Reports
                </Link>
              )}
              {user && (
                <Link href="/data" className={`${s.link} text-sm`}>
                  Data Sources
                </Link>
              )}
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Container
                </Link>
              )}
              <Link href="/" className={`${s.link} text-sm`}>
                Pricing
              </Link>
            </div>
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
      </div>
    </nav>
  );
}
