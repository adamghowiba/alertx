import React, { FC } from 'react';
import { BaseIconProps } from '../../../types/icon';
import {
  DEFAULT_ICON_HEIGHT,
  DEFAULT_ICON_WIDTH,
} from '../../../constants/icon.constants';

export interface SuccessIconProps extends BaseIconProps {}

const SuccessIcon: FC<SuccessIconProps> = ({ ...props }) => {
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
          d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2Zm2.12 4.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706Z"
        />
      </svg>
    </>
  );
};

export default SuccessIcon;
