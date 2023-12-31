import AccountDropdown from './Account';
import s from './Navbar.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

//Use server component here, but where client side interaction is needded use a client component

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    // <nav className=" sticky top-0 z-40 bg-white text-black transition-all duration-150">
    <nav className="bg-white text-black transition-all duration-150">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="w-screen  mx-auto">
        <div className="px-6 flex justify-between py-1">
          <div className="flex items-center">
            <span className={`${s.link} text-md p-2 organization-name`}>
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

          <div className="flex items-center space-x-2">
            {/* <button className={`${s.arrow} ${s.button} text-sm`} title="Redo">
              <RxQuestionMarkCircled />
            </button> */}
            <button className={`${s.help} text-sm`}>Help</button>

            <button className={`${s.feedback} text-sm`}>Feedback</button>

            {/* <button className={`${s.upgrade} text-sm`}>Upgrade</button> */}

            <div className="border-l h-8 border-gray-100 mx-2"></div>

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
          className={`top-0 sticky px-6 relative flex flex-row justify-between py-1 align-center md:py-1 bg`}
        >
          <div className="flex items-center flex-1">
            <button
              className={`${s.arrow} ${s.button} text-base`}
              title="Search"
            >
              <GoSearch />
            </button>

            <div className="border-l h-8 border-gray-100 mx-2"></div>

            <div className="hidden space-x-2 lg:block">
              {user && (
                <Link href="/overview" className={`${s.link} text-sm`}>
                  File
                </Link>
              )}
              {user && (
                <Link href="/overview" className={`${s.link} text-sm`}>
                  Edit
                </Link>
              )}
              {user && (
                <Link href="/overview" className={`${s.link} text-sm`}>
                  View
                </Link>
              )}

              {/* {user && (
                <Link href="/data" className={`${s.link} text-sm`}>
                  Data
                </Link>
              )} */}

              {user && (
                <Link href="/data" className={`${s.link} text-sm`}>
                  Data Sources
                </Link>
              )}
              {user && (
                <Link href="/account" className={`${s.link} text-sm`}>
                  Storage
                </Link>
              )}
            </div>

            <div className="border-l h-8 border-gray-100 mx-2"></div>

            {/* <button className={`${s.arrow} ${s.button} text-sm`} title="Undo">
              <SlArrowLeft />
            </button>

            <button className={`${s.arrow} ${s.button} text-sm`} title="Redo">
              <SlArrowRight />
            </button> */}
            {/* {user && (
              <Link href="/account" className={`${s.link} text-sm`}>
                Share
              </Link>
            )} */}
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mx-auto w-full" />
      </div>
    </nav>
  );
}
