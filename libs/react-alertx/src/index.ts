import './lib/styles/global.css';
import './lib/styles/root.css';

export { AlertItem as Alert } from './lib/components/Alert/AlertItem';
export type { AlertItemProps as AlertProps } from './lib/components/Alert/AlertItem';

export { AlertProvider } from './lib/components/AlertProvider/AlertProvider';
export type { AlertProviderProps } from './lib/components/AlertProvider/AlertProvider';

export { useAlerts } from './lib/hooks/use-alerts';
