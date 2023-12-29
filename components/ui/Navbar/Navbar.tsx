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
    <nav className="sticky top-0 z-40 bg-white text-black transition-all duration-150">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-8xl px-6 mx-auto">
        {/* New section above existing elements */}
        <div className="flex justify-between py-5 align-center">
          <div className="flex items-center">
            <span className={`${s.link} text-sm organization-name`}>
              Organization Name
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className={`${s.search}`} />

            <button className={`${s.link} text-sm`}>Feedback</button>

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
        <div className="relative flex flex-row justify-between py-2 align-center md:py-3 bg">
          <div className="flex items-center flex-1">
            <Link href="/" className={`${s.logo} text-sm`} aria-label="Logo">
              <Logo />
            </Link>
            <div className="hidden ml-6 space-x-2 lg:block">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
