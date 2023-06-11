import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface AlertItemProps {
  title?: string;
  message: string;
  icons?: Partial<Record<AlertStatus, ReactNode>>;
  actions?: ReactNode | ReactNode[];
  status?: AlertStatus;
  colors?: Partial<Record<AlertStatus, ReactNode>>;
  onClose?: () => void;
}

const ALERT_ICON_DEFAULTS: Required<AlertItemProps['icons']> = {
  warning: '',
  error: '',
  info: '',
  success: '',
};

const STATUS_COLOR_DEFAULTS: Required<AlertItemProps['colors']> = {
  warning: 'var(--ax-color-warning)',
  error: 'var(--ax-color-error)',
  info: 'black',
  success: 'var(--ax-color-success)',
};

export const AlertItem: FC<AlertItemProps> = ({
  message,
  title,
  actions,
  colors = STATUS_COLOR_DEFAULTS,
  status = 'info',
  ...props
}) => {
  const statusColors = { ...STATUS_COLOR_DEFAULTS, ...colors };

  return (
    <>
      <div
        className={`ax flex justify-between p-[14px] shadow-sm rounded-lg border-l-2 border-l-[${statusColors[status]}]`}
      >
        <div className="flex items-center gap-1">
          <div
            className={`"w-[15px] h-[15px] bg-[${statusColors[status]}]"`}
          ></div>

          <div className="alert__message">
            <span className="alert__title">{title}</span>
            <span className="alert__message">{message}</span>
          </div>
        </div>

        <div className="alert__actions">{actions}</div>
      </div>

      <style jsx>{`
        .alert__title {
          font-weight: 600;
          font-size: var(--ax-text-p3);
          color: var(--ax-color-content-secondary);
        }

        .alert__message {
          display: flex;
          flex-direction: column;
          font-size: var(--ax-text-p3);
          color: var(--ax-color-content-tertiary);
        }

        .alert--info {
          border-left: 2px solid ${statusColors.info};
        }

        .alert--warning {
          border-left: 2px solid ${statusColors.warning};
        }

        .alert--success {
          border-left: 2px solid ${statusColors.success};
        }

        .alert--error {
          border-left: 2px solid ${statusColors.error};
        }
      `}</style>
    </>
  );
};
