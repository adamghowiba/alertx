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
      <div className={classNames('ax', 'alert', `alert--${status}`)}>
        <div className="alert__details">
          <div className="alert__icon"></div>

          <div className="alert__message">
            <span className="alert__title">{title}</span>
            <span className="alert__message">{message}</span>
          </div>
        </div>

        <div className="alert__actions">{actions}</div>
      </div>

      <style jsx>{`
        h1 {
          color: red;
        }

        .green {
          color: green;
        }

        .alert {
          display: flex;
          justify-content: space-between;
          padding: 14px;
          box-shadow: 0px 8px 18px -6px rgba(24, 44, 75, 0.12),
            0px 12px 42px -4px rgba(24, 44, 75, 0.12);
          border-radius: 8px;
          border-left: 2px solid ${statusColors[status]};
        }

        .alert__details {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .alert__icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: ${colors[status]};
        }

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
