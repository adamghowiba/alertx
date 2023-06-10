import React, { FC, ReactNode } from 'react';

export interface AlertItemProps {
  title?: string;
  message: string;
  actions?: ReactNode | ReactNode[];
  onClose?: () => void;
}

export const AlertItem: FC<AlertItemProps> = ({
  message,
  title,
  actions,
  ...props
}) => {
  return (
    <>
      <div className="ax alert">
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
        .alert {
          display: flex;
          padding: 14px;
          box-shadow: 0px 8px 18px -6px rgba(24, 44, 75, 0.12),
            0px 12px 42px -4px rgba(24, 44, 75, 0.12);
          border-radius: 8px;
        }

        .alert__title {
          font-size: var(--ax-text-p3);
          color: var(--ax-color-content-secondary);
        }

        .alert__message {
          display: flex;
          flex-direction: column;
          font-size: var(--ax-text-p3);
          color: var(--ax-color-content-tertiary);
        }
      `}</style>
    </>
  );
};
