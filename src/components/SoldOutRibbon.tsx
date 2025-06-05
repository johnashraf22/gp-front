import React from 'react';

interface SoldOutRibbonProps {
  className?: string;
}

const SoldOutRibbon = ({ className = '' }: SoldOutRibbonProps) => {
  return (
    <div className={`absolute top-4 left-4 z-10 ${className}`}>
      <div className="bg-yellow-300 text-black font-bold px-3 py-1 text-xs uppercase tracking-wide transform -rotate-12 shadow-md border border-yellow-400">
        SOLD OUT
      </div>
    </div>
  );
};

export default SoldOutRibbon;