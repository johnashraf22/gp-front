import React from 'react';

interface SoldOutStripeProps {
  className?: string;
}

const SoldOutStripe: React.FC<SoldOutStripeProps> = ({ className = '' }) => {
  return (
    <div className="absolute top-0 left-0 overflow-hidden w-28 h-28 z-10">
      <div className="absolute transform -rotate-45 bg-yellow-200 text-yellow-800 font-bold text-center py-2 left-[-35px] top-[20px] w-[170px] shadow-md">
        Sold Out
      </div>
    </div>
  );
};

export default SoldOutStripe; 