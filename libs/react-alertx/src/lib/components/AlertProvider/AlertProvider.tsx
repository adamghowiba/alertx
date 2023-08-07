import {
  Alert,
  AlertStatus,
  AlertStore,
  xLocation,
  yLocation,
} from '@alertx/core';
import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  isValidElement,
  ReactElement,
  CSSProperties,
} from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { AlertItem } from '../AlertItem/AlertItem';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { transform: translateX(-105%); }
  100% { transform: translateX(0%); }
`;

const AlertWrapper = styled.div`
  position: relative;
  animation: ${fadeIn} 0.25s ease-out normal;
`;

export type CustomAlertComponent = (props: Alert) => ReactElement;

export interface AlertProviderComponents {
  alertComponent?: CustomAlertComponent;
  variants?: { [key in AlertStatus]?: CustomAlertComponent };
}

export interface AlertProviderProps extends PropsWithChildren {
  store: AlertStore;
  Components?: AlertProviderComponents;
}

const AlertItemRender: FC<{
  alert: Alert;
  components?: AlertProviderComponents;
  onClose: () => void;
}> = ({ alert, components, onClose, ...props }) => {
  if (
    alert.status &&
    typeof components?.variants?.[alert.status] === 'function'
  ) {
    return (components.variants[alert.status] as any)(alert);
  }

  if (typeof components?.alertComponent === 'function')
    return components.alertComponent(alert);

  return (
    <div className="alert-wrapper">
      <AlertItem
        key={alert.id}
        status={alert.status}
        message={alert.message}
        title={alert?.title}
        display={{ closeAction: true }}
        onClose={onClose}
        actions={
          typeof alert.actions === 'function'
            ? alert.actions(alert)
            : (Array.isArray(alert.actions) &&
                alert.actions.every(isValidElement)) ||
              isValidElement(alert.actions)
            ? alert.actions
            : undefined
        }
      />
    </div>
  );
};

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  store,
  Components,
  ...props
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const alertStore = store.on((alert) => {
      setAlerts(alert);
    });

    return () => {
      alertStore.unsubscribe();
    };
  }, [store]);

  const handleMouseEnter = () => {
    store.toggleHovering();
  };

  const handleMouseLeave = () => {
    store.toggleHovering();
  };

  /**
   * @TODO
   * Abstract away from provider
   * @ODO
   * rename ro xOrigin, yOrigin
   */

  const xLocations: xLocation[] = ['left', 'center', 'right'];
  const yLocations: yLocation[] = ['top', 'center', 'bottom'];

  /**
   * @TODO
   * Abstract away from provider
   */

  const getOriginContainers = () => {
    let locations: {
      xLocation: xLocation;
      yLocation: yLocation;
    }[] = [];

    for (
      let xLocationIndex = 0;
      xLocationIndex < xLocations.length;
      xLocationIndex++
    ) {
      const xLocation = xLocations[xLocationIndex] as any;

      for (
        let yLocationIndex = 0;
        yLocationIndex < yLocations.length;
        yLocationIndex++
      ) {
        const yLocation = yLocations[yLocationIndex] as any;

        locations = [
          ...locations,
          { xLocation: xLocation, yLocation: yLocation },
        ];
      }
    }

    return locations;
  };

  /**
   * @TODO
   * Abstract away from provider
   */
  const getAlertsByLocation = (location: { x: xLocation; y: yLocation }) => {
    return alerts.filter(
      (alert) =>
        alert.anchorOrigin?.x === location.x &&
        alert.anchorOrigin.y === location.y
    );
  };

  /**
   * @TODO
   * Abstract away from provider
   */
  const getAnchorOriginCss = (params: {
    x: xLocation;
    y: yLocation;
    offset?: string | number;
  }): CSSProperties => {
    let cssStyles: CSSProperties = {};
    const offset = params.offset || '1rem';

    if (params.x === 'right' || params.x === 'left') {
      cssStyles = { ...cssStyles, [params.x]: offset };
    }

    if (params.y === 'top' || params.y === 'bottom') {
      cssStyles = { ...cssStyles, [params.y]: offset };
    }

    if (params.x === 'center' || params.y === 'center') {
      cssStyles = {
        ...cssStyles,
        ...(params.x === 'center' && { left: '50%' }),
        ...(params.y === 'center' && { top: '50%' }),
        transform: `translate(${params.x === 'center' ? '-50%' : 0}, ${
          params.y === 'center' ? '-50%' : 0
        })`,
      };
    }

    return cssStyles || { left: offset, bottom: offset };
  };

  const handleWindowFocusEvent = (event: FocusEvent) => {
    store.unpauseRemoval();
  };

  const handleWindowBlurEvent = (event: FocusEvent) => {
    store.pauseRemoval();
  };

  useEffect(() => {
    window.addEventListener('focus', handleWindowFocusEvent);
    window.addEventListener('blur', handleWindowBlurEvent);

    return () => {
      window.removeEventListener('focus', handleWindowFocusEvent);
      window.removeEventListener('blur', handleWindowBlurEvent);
    };
  }, []);

  return (
    <>
      <AlertContext.Provider
        value={{
          alerts: alerts,
          alert: (message, alert) => {
            return store.alert({ message, ...alert });
          },
          alertPromise: (message, alert) => {
            return store.alertPromise({ message, ...alert });
          },
          clear: () => {
            return store.clear();
          },
          removeAlert: (id) => {
            return store.remove(id);
          },
          updateAlert: (id, alert) => {
            return store.update(id, alert);
          },
        }}
      >
        {getOriginContainers().map((location) => {
          return (
            <div
              key={JSON.stringify(location)}
              style={{
                ...getAnchorOriginCss({
                  x: location.xLocation,
                  y: location.yLocation,
                }),
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {getAlertsByLocation({
                x: location.xLocation,
                y: location.yLocation,
              }).map((alert) => {
                console.log({
                  status: alert.status,
                  xLoc: alert.anchorOrigin?.x,
                  yLoc: alert.anchorOrigin?.y,
                });
                return (
                  <AlertWrapper
                    key={alert.id}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <AlertItemRender
                      onClose={() => store.remove(alert.id)}
                      alert={alert}
                      components={Components}
                    />
                  </AlertWrapper>
                );
              })}
            </div>
          );
        })}

        {children}
      </AlertContext.Provider>

      <style jsx>{``}</style>
    </>
  );
};
