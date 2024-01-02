import React from 'react';
import s from './report.module.css';

const Overview = () => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="bg-white h-screen w-4/6 p-8 shadow-md border-2 border-gray-700 mt-10">
        {/* Content inside the sheet of paper */}
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none border-none text-lg text-black"
          placeholder=""
        />
      </div>
    </div>
  );
};

export default Overview;
