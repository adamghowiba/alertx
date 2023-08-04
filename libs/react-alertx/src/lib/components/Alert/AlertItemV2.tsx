import { AlertStatus } from '@alertx/core';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WarningIcon from '../Icons/WarningIcon/WarningIcon';
import ErrorIcon from '../Icons/ErrorIcon/ErrorIcon';
import SuccessIcon from '../Icons/SuccessIcon/SuccessIcon';
import CloseIcon from '../Icons/CloseIcon/CloseIcon';
import IconButton from '../IconButton/IconButton';

export interface AlertItemProps {
  title?: string;
  message: string;
  icons?: Partial<Record<AlertStatus, ReactNode>>;
  actions?: ReactNode | ReactNode[];
  status?: AlertStatus;
  colors?: Partial<Record<AlertStatus, ReactNode>>;
  display?: {
    closeAction?: boolean;
  };
  onClose?: () => void;
}

const ALERT_ICON_DEFAULTS: Required<AlertItemProps['icons']> = {
  warning: <WarningIcon color="var(--ax-color-warning)" />,
  error: <ErrorIcon color="var(--ax-color-error)" />,
  success: <SuccessIcon color="var(--ax-color-success)" />,
  info: '',
  loading: '',
};

const STATUS_COLOR_DEFAULTS: Required<AlertItemProps['colors']> = {
  warning: 'var(--ax-color-warning)',
  error: 'var(--ax-color-error)',
  info: 'black',
  success: 'var(--ax-color-success)',
  loading: 'gray',
};

const AlertDetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const AlertDiv = styled.div<AlertItemProps>`
  display: flex;
  justify-content: space-between;
  padding: 14px;
  gap: 1rem;
  box-shadow: 0px 8px 18px -6px rgba(24, 44, 75, 0.12),
    0px 12px 42px -4px rgba(24, 44, 75, 0.12);
  border-radius: 8px;
  border-left: 3px solid
    ${(props) =>
      props.status
        ? (props?.colors || STATUS_COLOR_DEFAULTS)[props.status]?.toString()
        : 'black'};
`;

const AlertIcon = styled.div<{
  statusColors: Required<AlertItemProps['colors']>;
  status: AlertStatus;
}>``;

const AlertMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--ax-text-p3);
  color: var(--ax-color-content-tertiary);
`;

const AlertTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const AlertActionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: var(--ax-space-sm);
`;

const AlertIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
      <div className="alert">
        <div className="alert__details">
          <AlertIconWrapper>
            {status === 'loading' ? (
              <LoadingSpinner />
            ) : (
              <AlertIcon statusColors={statusColors} status={status}>
                {ALERT_ICON_DEFAULTS[status]}
              </AlertIcon>
            )}
          </AlertIconWrapper>

          <AlertMessageDiv>
            <AlertTitleSpan>{title}</AlertTitleSpan>
            <span className="alert-span">{message}</span>
          </AlertMessageDiv>
        </div>

        <AlertActionDiv>
          {actions}
          {props?.display?.closeAction && (
            <IconButton onClick={props?.onClose}>
              <CloseIcon width={16} height={16} />
            </IconButton>
          )}
        </AlertActionDiv>
      </div>

      <style jsx>
        {`
          .alert {
            display: flex;
            justify-content: space-between;
            padding: 14px;
            gap: 1rem;
            box-shadow: 0px 8px 18px -6px rgba(24, 44, 75, 0.12),
              0px 12px 42px -4px rgba(24, 44, 75, 0.12);
            border-radius: 8px;
            border-left: 3px solid
              ${{ ...STATUS_COLOR_DEFAULTS, ...colors }?.[status] || 'black'};

            &__details {
              display: flex;
              align-items: center;
              gap: 0.6rem;
            }
          }
        `}
      </style>
    </>
  );
};
