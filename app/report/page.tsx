import React from 'react';

const Overview = () => {
  return (
    <div className="w-screen h-screen bg-gray-700 flex items-center justify-center">
      <div className="bg-white h-4/5 w-4/6 p-8 shadow-md rounded-lg">
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
