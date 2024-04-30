import { useState, useEffect } from 'react';

const Alert = ({ alert }) => {
  const [visible, setVisible] = useState(true);

  if(alert.autoClose){
      useEffect(() => {
        const timer = setTimeout(() => {
          setVisible(false);
        }, 5000);
    
        return () => clearTimeout(timer);
      }, []); 
  }

  return visible ? (
    <div
      className={`${
        alert.error ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'
      } bg-gradient-to-br text-center p-3 border uppercase text-white font-bold text-sm my-5`}
    >
      {alert.msg}
    </div>
  ) : null;
};

export default Alert;
