import { AlertStatus } from '@alertx/core';
import { FC, ReactNode } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WarningIcon from '../Icons/WarningIcon/WarningIcon';
import ErrorIcon from '../Icons/ErrorIcon/ErrorIcon';
import SuccessIcon from '../Icons/SuccessIcon/SuccessIcon';
import CloseIcon from '../Icons/CloseIcon/CloseIcon';
import IconButton from '../IconButton/IconButton';
import styled from '@emotion/styled';

const ALERT_ICON_DEFAULTS: Required<AlertProps['icons']> = {
  warning: <WarningIcon color="var(--ax-color-warning)" />,
  error: <ErrorIcon color="var(--ax-color-error)" />,
  success: <SuccessIcon color="var(--ax-color-success)" />,
  info: '',
  loading: '',
};

const STATUS_COLOR_DEFAULTS: Required<AlertProps['colors']> = {
  warning: 'var(--ax-color-warning)',
  error: 'var(--ax-color-error)',
  info: 'black',
  success: 'var(--ax-color-success)',
  loading: 'gray',
};

export interface AlertProps {
  title?: string;
  message: string;
  icons?: Partial<Record<AlertStatus, ReactNode>>;
  actions?: ReactNode | ReactNode[];
  status?: AlertStatus;
  colors?: Partial<Record<AlertStatus, ReactNode>>;
  className?: string;
  display?: {
    closeAction?: boolean;
  };
  onClose?: () => void;
}

export const AlertItem: FC<AlertProps> = ({
  message,
  title,
  actions,
  className,
  colors = STATUS_COLOR_DEFAULTS,
  status = 'info',
  ...props
}) => {
  const statusColors = { ...STATUS_COLOR_DEFAULTS, ...colors };

  return (
    <AlertRoot
      className={className}
      message={message}
      status={status}
      colors={colors}
    >
      <AlertDetailsDiv>
        <AlertIconWrapper>
          {status === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <AlertIcon statusColors={statusColors} status={status}>
              {ALERT_ICON_DEFAULTS[status]}
            </AlertIcon>
          )}
        </AlertIconWrapper>

        <AlertMessageDiv className="alert__message">
          <AlertTitleSpan>{title}</AlertTitleSpan>
          <span className="alert-span">{message}</span>
        </AlertMessageDiv>
      </AlertDetailsDiv>

      <AlertActionDiv>
        {actions}
        {props?.display?.closeAction && (
          <IconButton onClick={props?.onClose}>
            <CloseIcon width={16} height={16} />
          </IconButton>
        )}
      </AlertActionDiv>
    </AlertRoot>
  );
};

const AlertDetailsDiv = styled('div', { label: 'alert__details-div' })`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const AlertRoot = styled('div', { label: 'alert' })<AlertProps>`
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

const AlertIcon = styled('div', { label: 'alert-icon' })<{
  statusColors: Required<AlertProps['colors']>;
  status: AlertStatus;
}>``;

const AlertMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--ax-text-p3);
  color: var(--ax-color-content-tertiary);
`;

const AlertTitleSpan = styled('span', { label: 'alert__title' })`
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
