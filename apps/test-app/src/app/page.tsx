import { useAlerts } from '@alertx/react-alertx';
import { AlertItem } from 'libs/react-alertx/src/lib/components/Alert/AlertItem';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

const Page = () => {
  const { addAlert, alerts } = useAlerts();

  const handleAddAlert = () => {
    addAlert({
      title: 'Data successful',
      message: 'Upload successful continue.',
      id: nanoid(),
    });
  };

  useEffect(() => {
    console.log(alerts);
  }, [alerts]);

  return (
    <div>
      <button onClick={handleAddAlert}>Alert</button>

      <div className="center">
        <AlertItem
          title="This is an alert"
          message="this is an alert message"
          status="info"
        />
        <AlertItem
          title="This is an alert"
          message="this is an alert message"
          status="success"
        />
        <AlertItem
          title="This is an alert"
          message="this is an alert message"
          status="error"
        />
        <AlertItem
          title="This is an alert"
          message="this is an alert message"
          status="warning"
        />
      </div>


      <style jsx>
        {`
        .center {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          width: 100%;
          height: 100%;
        }
        `}
      </style>
    </div>
  );
};

export default Page;
