import { AlertStatus } from '@alertx/core';
import { AlertJsx, useAlerts } from '@alertx/react-alertx';
import { Alert } from '@alertx/react-alertx';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import TestComp from '../componenets/TestComp';

const Page = () => {
  const { addAlert, removeAlert, alertPromise, alerts, clear } = useAlerts();
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus>('info');

  const handleAddAlert = () => {
    const alert = addAlert({
      title: 'Data successful',
      message: 'Upload successful continue.',
      status: selectedStatus,
      showDuration: 1000 * 15,
      persist: true,
      actions: (params) => (
        <button className="small-button" onClick={() => removeAlert(params.id)}>
          Close
        </button>
      ),
    });
  };

  const handleAddAlertPromise = () => {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        rej('');
      }, 1000 * 20);
    });

    alertPromise({
      alertPromise: promise,
      id: nanoid(),
      persist: true,
      message: 'This is an alert promise',
      actions: <button>Click</button>,
    });
  };

  const clearAllAlerts = () => {
    clear();
  };

  // useEffect(() => {
  //   console.log(alerts);
  // }, [alerts]);

  return (
    <div>
      <div className="radios">
        {(['success', 'error', 'warning', 'info'] as AlertStatus[]).map(
          (status) => (
            <div className="radio-item" key={status}>
              <input
                name="status"
                type="radio"
                value={status}
                onChange={() => setSelectedStatus(status)}
              />
              <label>{status}</label>
            </div>
          )
        )}
      </div>

      <button className="large-button" onClick={handleAddAlert}>
        Alert
      </button>
      <button className="large-button" onClick={handleAddAlertPromise}>
        Alert Promise
      </button>
      <button className="large-button" onClick={clearAllAlerts}>
        Clear alerts
      </button>

      <TestComp />

      <div className="local-green">Should still be back</div>

      <div className="center">
        <Alert
          title="This is an alert"
          message="this is an alert message"
          status="info"
        />
        <AlertJsx
          title="This is an alert"
          message="this is an alert message"
          status="info"
        />
        TT
      </div>

      <div className="red">Should be back</div>

      <style jsx>
        {`
          .small-button {
            cursor: pointer;
          }

          .radios {
            display: flex;
            gap: 1.5rem;
            margin: 1rem;
          }
          .radio-item {
            display: flex;
            gap: 0.25rem;
          }

          .large-button {
            padding: 0.5rem;
            margin: 1rem;
            background-color: black;
            color: white;
            border-radius: 8px;
            width: 150px;
          }

          .center {
            border: 1px solid lightblue;
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem;
            display: flex;
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
