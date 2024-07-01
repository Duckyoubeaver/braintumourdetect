import { Database } from '@/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Create a Supabase client for server components
export const createServerSupabaseClient = () =>
  createServerComponentClient<Database>({ cookies });

// Get the current session
export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Get user details
export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Get the current subscription
export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Get active products with prices
export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// // 'use server';

// // import { Database } from '@/types_db';
// // import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// // import { cookies } from 'next/headers';

// // // import { cache } from 'react';

// // // export const createServerSupabaseClient = cache(() =>
// // //   createServerComponentClient<Database>({ cookies })
// // // );

// // // import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// // // import { cookies } from 'next/headers';

// // // changed this temporarily due to issues in the browswer, change back if not working

// // export const createServerSupabaseClient = () =>
// //   createServerComponentClient({ cookies });

// // export async function getSession() {
// //   const supabase = createServerSupabaseClient();
// //   try {
// //     const {
// //       data: { session }
// //     } = await supabase.auth.getSession();
// //     return session;
// //   } catch (error) {
// //     console.error('Error:', error);
// //     return null;
// //   }
// // }

// // export async function getUserDetails() {
// //   const supabase = createServerSupabaseClient();
// //   try {
// //     const { data: userDetails } = await supabase
// //       .from('users')
// //       .select('*')
// //       .single();
// //     return userDetails;
// //   } catch (error) {
// //     console.error('Error:', error);
// //     return null;
// //   }
// // }

// // export async function getSubscription() {
// //   const supabase = createServerSupabaseClient();
// //   try {
// //     const { data: subscription } = await supabase
// //       .from('subscriptions')
// //       .select('*, prices(*, products(*))')
// //       .in('status', ['trialing', 'active'])
// //       .maybeSingle()
// //       .throwOnError();
// //     return subscription;
// //   } catch (error) {
// //     console.error('Error:', error);
// //     return null;
// //   }
// // }

// // export const getActiveProductsWithPrices = async () => {
// //   const supabase = createServerSupabaseClient();
// //   const { data, error } = await supabase
// //     .from('products')
// //     .select('*, prices(*)')
// //     .eq('active', true)
// //     .eq('prices.active', true)
// //     .order('metadata->index')
// //     .order('unit_amount', { foreignTable: 'prices' });

// //   if (error) {
// //     console.log(error.message);
// //   }
// //   return data ?? [];
// // };

// // supabase-server.ts

// 'use server';

// import { Database } from '@/types_db';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export const createServerSupabaseClient = () =>
//   createServerComponentClient({ cookies });

// export async function getSession() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const {
//       data: { session }
//     } = await supabase.auth.getSession();
//     return session;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// export async function getUserDetails() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const {
//       data: { user }
//     } = await supabase.auth.getUser();
//     return user;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// // // Adjust path as necessary

// export async function getSubscription() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const { data: subscription } = await supabase
//       .from('subscriptions')
//       .select('*, prices(*, products(*))')
//       .in('status', ['trialing', 'active'])
//       .maybeSingle()
//       .throwOnError();
//     return subscription;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// export const getActiveProductsWithPrices = async () => {
//   const supabase = createServerSupabaseClient();
//   const { data, error } = await supabase
//     .from('products')
//     .select('*, prices(*)')
//     .eq('active', true)
//     .eq('prices.active', true)
//     .order('metadata->index')
//     .order('unit_amount', { foreignTable: 'prices' });

//   if (error) {
//     console.log(error.message);
//   }
//   return data ?? [];
// };

// export const createServerSupabaseClient = () =>
//   createServerComponentClient({ cookies });

// export async function getSession() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const {
//       data: { session }
//     } = await supabase.auth.getSession();
//     return session;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// export async function getUserDetails() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const {
//       data: { user }
//     } = await supabase.auth.getUser();
//     return user;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }
