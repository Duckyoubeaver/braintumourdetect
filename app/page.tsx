// import Pricing from '@/components/Pricing';
// import {
//   getSession,
//   getSubscription,
//   getActiveProductsWithPrices
// } from '@/app/supabase-server';

// export default async function PricingPage() {
//   const [session, products, subscription] = await Promise.all([
//     getSession(),
//     getActiveProductsWithPrices(),
//     getSubscription()
//   ]);

//   return (
//     <Pricing
//       session={session}
//       user={session?.user}
//       products={products}
//       subscription={subscription}
//     />
//   );
// }

import s from './Home.module.css';
import React from 'react';

const Home = () => {
  return (
    <div
      className={`${s.background} w-screen h-screen flex items-center justify-center`}
    >
      {/* <div className={`${s.border} bg-white h-screen w-5/6 p-8 mt-10 mb-10`}>
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none border-none text-lg text-black"
          placeholder=""
        />
      </div> */}
    </div>
  );
};

export default Home;
