
import React from 'react'

const SectionHeading = ({ 
  title = "Explore by Category", 
  buttonText = "View All", 
  showButton = true,
  onButtonClick = () => {},
  className = ""
}) => {
  return (
    <div className={`container mx-auto  px-5 md:px-0 flex items-center justify-between  py-10 ${className}`}>
      {/* Left side - Title */}
      <div className="flex items-center">
        {/* Blue accent bar */}
        <div className='h-16 w-5 object-cover '>
            <img src="https://i.ibb.co/3YfRMvN0/Explorebutton.png" alt="blue bar" className='h-full' />
        </div>
        
        {/* Title text */}
        <h2 className="text-white text-3xl font-semibold">
          {title}
        </h2>
      </div>
      
      {/* Right side - Button (conditionally rendered) */}
      {showButton && (
        <button 
          onClick={onButtonClick}
          className="bg-[#136BFB] whitespace-nowrap cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SectionHeading;