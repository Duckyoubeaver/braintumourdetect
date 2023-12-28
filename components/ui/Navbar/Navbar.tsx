import AccountDropdown from './Account';
import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
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
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-8xl px-6 mx-auto">
        {/* New section above existing elements */}
        <div className="flex justify-between py-5 align-center">
          <div className="flex items-center">
            <span className="text-sm font-bold">Organization Name</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className={`${s.link} text-sm`}
            />
            <button
              className={`${s.link} text-sm border border-gray-300 rounded-md px-3 py-1`}
            >
              Feedback
            </button>
            {/* {user && (
              <Link href="/account" className={`${s.link} text-sm`}>
                Account
              </Link>
            )} */}
            <div className="flex justify-end flex-1 space-x-8">
              {user ? (
                <AccountDropdown />
              ) : (
                <Link href="/signin" className={`${s.link} text-sm`}>
                  Sign in
                </Link>
              )}
            </div>
            {/* {user && <AccountDropdown />} Use the new component here */}
          </div>
        </div>

        {/* Existing navigation section */}
        <div className="relative flex flex-row justify-between py-2 align-center md:py-0">
          <div className="flex items-center flex-1">
            <Link href="/" className={`${s.logo} text-sm`} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Overview
                </Link>
              )}
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Analytics
                </Link>
              )}
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Data Sources
                </Link>
              )}
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Storage
                </Link>
              )}
              <Link href="/" className={`${s.link} text-sm`}>
                Pricing
              </Link>
            </nav>
          </div>
          {/* <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={`${s.link} text-sm`}>
                Sign in
              </Link>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
}
