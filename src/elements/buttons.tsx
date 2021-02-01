import React from 'react';

export const ActionButton = (props) => (
  <button
    className='flex disabled:opacity-50 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 max-w-md'
    {...props}
  />
);
