import './lib/styles/global.css';
import './lib/styles/root.css';
import './lib/styles/alertx-tailwind.scss';

export { AlertItem as Alert } from './lib/components/Alert/AlertItem';
export type { AlertItemProps as AlertProps } from './lib/components/Alert/AlertItem';

export { AlertItem as AlertTailwind } from './lib/components/Alert/AlertItemTailwind';

export { AlertItem as AlertJsx } from './lib/components/Alert/AlertItemSJSX';

export { AlertProvider } from './lib/components/AlertProvider/AlertProvider';
export type { AlertProviderProps } from './lib/components/AlertProvider/AlertProvider';

export { useAlerts } from './lib/hooks/use-alerts';
