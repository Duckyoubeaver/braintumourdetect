import s from './Home.module.css';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div
      className={`${s.background} w-screen h-screen flex flex-col items-center justify-center`}
    >
      <header
        className={`${s.header} text-center text-4xl font-bold text-black mb-8`}
      >
        Accurate Patient Care Starts Here
      </header>
      <div className="max-w-3xl mx-auto mb-8">
        <p className="text-center text-xl text-black mb-6">
          Empowering Neuroradiologists with Complementary AI Technology for
          Brain Tumor Diagnosis.
        </p>

        {/* Centered "Get Started" button */}

        {!user && (
          <div>
            <div className="text-center">
              <Link href="/signin" className={`${s.getStartedButton}`}>
                Get Started
              </Link>
            </div>
          </div>
        )}

        {/* Added spacing */}
        <div className="mb-8"></div>

        <div
          className={`${s.features} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          <div className={`${s.featureCard} bg-white shadow-lg rounded-lg p-6`}>
            <h3 className="text-xl font-semibold text-black mb-4">
              Accurate Classification
            </h3>
            <p className="text-black">
              Our state-of-the-art algorithms provide precise classification of
              brain tumors, aiding in effective diagnosis and treatment
              planning.
            </p>
          </div>
          <div className={`${s.featureCard} bg-white shadow-lg rounded-lg p-6`}>
            <h3 className="text-xl font-semibold text-black mb-4">
              Efficient Workflow
            </h3>
            <p className="text-black">
              Our streamlined interface is designed for radiologists, enhancing
              their workflow efficiency and diagnostic accuracy.
            </p>
          </div>
          <div className={`${s.featureCard} bg-white shadow-lg rounded-lg p-6`}>
            <h3 className="text-xl font-semibold text-black mb-4">
              Collaborative Tools
            </h3>
            <p className="text-black">
              Collaborate seamlessly with medical professionals, share insights,
              and improve patient care outcomes.
            </p>
          </div>
        </div>
      </div>
      <footer className={`${s.footer} text-center text-black mt-8`}>
        &copy; 2024 NeuroVision Classification Software. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
