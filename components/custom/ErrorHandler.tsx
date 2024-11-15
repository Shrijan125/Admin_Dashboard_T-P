import React from 'react';

const ErrorHandler = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-full justify-center flex items-center text-2xl capitalize">
      {message} !
    </div>
  );
};

export default ErrorHandler;
