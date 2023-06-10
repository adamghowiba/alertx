import { useAlerts } from '@alertx/react-alertx';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

const Page = () => {
  const { addAlert, alerts } = useAlerts();

  const handleAddAlert = () => {
    addAlert({
      title: 'Data successful',
      message: "Upload successful continue.",
      id: nanoid(),
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
