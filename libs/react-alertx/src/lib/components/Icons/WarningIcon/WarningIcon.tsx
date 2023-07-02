import React, { FC } from 'react';
import { BaseIconProps } from '../../../types/icon';
import {
  DEFAULT_ICON_HEIGHT,
  DEFAULT_ICON_WIDTH,
} from '../../../constants/icon.constants';

export interface WarningIconProps extends BaseIconProps {}

const WarningIcon: FC<WarningIconProps> = ({ ...props }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_ICON_WIDTH}
        height={props.height || DEFAULT_ICON_HEIGHT}
        viewBox="0 0 16 16"
      >
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
        <path
          fill={props.color || 'inherit'}
          d="M9.092 2.638a1.25 1.25 0 0 0-2.182 0L2.157 11.14A1.25 1.25 0 0 0 3.247 13h9.504a1.25 1.25 0 0 0 1.091-1.86l-4.75-8.502ZM8.75 10.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0ZM7.5 8V5.5a.5.5 0 0 1 1 0V8a.5.5 0 0 1-1 0Z"
        />
      </svg>
    </>
  );
};

export default WarningIcon;
