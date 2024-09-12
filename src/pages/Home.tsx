import React from "react";
import { useAuth } from "../core/hooks/useAuth";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center m-6'>Hello World</h1>
      <p className='border-t border-b border-sky-500 mt-5'>
        {currentUser ? (
          <span className='text-lime-600'>Welcome: {currentUser.username}</span>
        ) : (
          <span className='text-red-600'>
            <b>Status</b>: Not Logged In
          </span>
        )}
      </p>
    </div>
  );
};

export default Home;
