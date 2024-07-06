'use server';

import DocComponent from './Docs';
import s from './Documentation.module.css';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react';

const Documentation = async () => {
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
      <DocComponent />
    </div>
  );
};

export default Documentation;
