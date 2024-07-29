import React, { useState, useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';
import { IoIosTimer } from "react-icons/io";
import DateTime from 'react-datetime';

const DateTimePickerComponent = () => {
  const [showCard, setShowCard] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Function to calculate the time remaining
  const calculateTimeRemaining = (deadline) => {
    if (!deadline) return '';

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;

    if (timeDiff <= 0) return 'Deadline passed';

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Set up the interval to update the timer every second
    const intervalId = setInterval(() => {
      if (deadline) {
        setTimeRemaining(calculateTimeRemaining(deadline));
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [deadline]);

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date.toDate());
  };

  return (
    <div>
      <button
        onClick={toggleCard}
        className="p-2 rounded-full text-black float-right ml-2 focus:outline-none">
        <IoIosTimer />
      </button>

      {showCard && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }} 
          className="mt-4 p-4 bg-white shadow-md rounded-lg w-fit">
          <p className="mt-2 text-gray-600">
            Set your task deadline
          </p>
          <DateTime
            onChange={handleDeadlineChange}
            inputProps={{ placeholder: 'Select deadline' }}
          />
          {deadline && (
            <p className="mt-2 text-gray-800">
              Time remaining: {timeRemaining}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimePickerComponent;
