'use server';

/*
KEY INFORMATION AND TIPS!!!

When dealing with components that deal with both server-side and client side processing
split it up into serverside and client side components
The easiest way to do this is to take the entire clientside module, 
and import it as a module inside the server side component. 
EX I took the entire SCANS component I made, and imported it into a dummy page.tsx that only does authentication.
*/

// import A MODULE HERE
import ModelComponent from './Model';
import s from './Model.module.css';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react';

const Model = async () => {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }
  return (
    <div
      className={`${s.background} w-screen h-screen flex items-center justify-center`}
    >
      <ModelComponent />
    </div>
  );
};

export default Model;
