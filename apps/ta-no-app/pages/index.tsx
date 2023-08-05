import { Alert, useAlerts } from '@alertx/react-alertx';
import styled from '@emotion/styled';

const CustomAlert = styled(Alert)({});

export function Index() {
  const { alert } = useAlerts();

  const addAlert = (type: 'success' | 'warning' | 'error' | 'loading') => {
    if (type === 'success') {
      alert(<div style={{ color: 'red' }}>Hello</div>, { status: 'success' });
    }

    if (type === 'warning') {
      alert('This is warning message', { status: 'warning' });
    }

    if (type === 'error') {
      alert('This is warning message', { status: 'error' });
    }

    if (type === 'loading') {
      alert("What's going on bro", { status: 'loading' });
    }
  };

  return (
    <div>
      <button onClick={() => addAlert('success')}>Success</button>
      <button onClick={() => addAlert('warning')}>Warning</button>
      <button onClick={() => addAlert('error')}>Error</button>
      <button onClick={() => addAlert('loading')}>Loading</button>

      <div className="alert-div">Hi sirb</div>

      <style jsx>{`
        button {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin: 1rem;
          cursor: pointer;
        }
        .page {
        }
      `}</style>
    </div>
  );
}

export default Index;
