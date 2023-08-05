import './lib/styles/global.css';
import './lib/styles/root.css';

export { AlertItem as Alert } from './lib/components/AlertItem/AlertItem';
export type { AlertProps } from './lib/components/AlertItem/AlertItem';

export { AlertProvider } from './lib/components/AlertProvider/AlertProvider';
export type { AlertProviderProps } from './lib/components/AlertProvider/AlertProvider';

export { useAlerts } from './lib/hooks/use-alerts';
export * from '@alertx/core';
