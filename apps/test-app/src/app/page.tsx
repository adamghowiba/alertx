import { useAlerts } from '@alertx/react-alertx';
import React, { useEffect } from 'react';

const Page = () => {
  const { addAlert, alerts } = useAlerts();

  const handleAddAlert = () => {
    addAlert({
      title: 'Data successful',
      message: "Upload successful continue.",
      id: Math.random().toString(),
      persist: true
    });
  };

  useEffect(() => {
    console.log(alerts);
  }, [alerts]);

  return (
    <div>
      <button onClick={handleAddAlert}>Alert</button>
    </div>
  );
};

export default Page;
