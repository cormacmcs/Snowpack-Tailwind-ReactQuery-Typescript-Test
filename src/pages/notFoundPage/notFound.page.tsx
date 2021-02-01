import React from 'react';

import { useHistory } from 'react-router-dom';
import './notFound.css';

interface IProps {}

export default function NotFoundPage(props: IProps) {
  let history = useHistory();

  return (
    <div className='flex flex-col align-center'>
      <h1>Component Not Found</h1>
      <div className='flex flex-row justify-center'>
        <button
          className='flex bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6'
          id='btn'
          onClick={() => history.goBack()}
        >
          Back to last page
        </button>
      </div>
    </div>
  );
}
