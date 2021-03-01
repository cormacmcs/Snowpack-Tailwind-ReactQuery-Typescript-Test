import React from 'react';
import { classnames } from '@app/tailwindcss-classnames';

// Useful way to use tailwind below with classnames package

const roundedButton = classnames(
  'flex',
  'disabled:opacity-50',
  'text-center',
  'px-4',
  'py-3',
  'rounded-lg',
  'font-bold',
  'transition',
  'duration-300',
  'ease-in-out',
  'mr-6',
  'max-w-md'
);

export const ActionButton = (props) => (
  <button className={classnames(roundedButton, 'bg-blue-500', 'text-white', 'hover:bg-blue-600')} {...props} />
);

export const AltButton = (props) => (
  <button
    className={classnames(
      roundedButton,
      props.toggled ? 'bg-blue-400' : 'bg-white',
      'border-2',
      'border-blue-500',
      props.toggled ? 'text-white' : 'text-blue-500',
      'hover:text-white',
      'hover:bg-blue-500'
    )}
    {...props}
  />
);
