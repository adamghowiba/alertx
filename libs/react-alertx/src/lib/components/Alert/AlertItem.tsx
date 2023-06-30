import { FC, ReactNode } from 'react';
import styled from 'styled-components';

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

const AlertDetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AlertDiv = styled.div<{
  statusColors: Required<AlertItemProps['colors']>;
  status: AlertStatus;
}>`
  display: flex;
  justify-content: space-between;
  padding: 14px;
  box-shadow: 0px 8px 18px -6px rgba(24, 44, 75, 0.12),
    0px 12px 42px -4px rgba(24, 44, 75, 0.12);
  border-radius: 8px;
  border-left: 3px solid
    ${(props) =>
      props.statusColors
        ? props.statusColors[props.status]?.toString()
        : 'black'};
`;

const AlertIcon = styled.div<{
  statusColors: Required<AlertItemProps['colors']>;
  status: AlertStatus;
}>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.statusColors
      ? props.statusColors[props.status]?.toString()
      : 'black'};
`;

const AlertMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--ax-text-p3);
  color: var(--ax-color-content-tertiary);
`;

const AlertTitleSpan = styled.span``;

const AlertActionDiv = styled.div`
  display: flex;
  gap: var(--space-sm);
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
      <AlertDiv statusColors={statusColors} status={status}>
        <AlertDetailsDiv className="ax">
          <AlertIcon statusColors={statusColors} status={status}></AlertIcon>

          <AlertMessageDiv>
            <AlertTitleSpan>{title}</AlertTitleSpan>
            <span>{message}</span>
          </AlertMessageDiv>
        </AlertDetailsDiv>

        <AlertActionDiv>{actions}</AlertActionDiv>
      </AlertDiv>
    </>
  );
};
