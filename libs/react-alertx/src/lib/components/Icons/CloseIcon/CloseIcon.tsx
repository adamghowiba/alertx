import React, { FC } from 'react';
import { BaseIconProps } from '../../../types/icon';
import {
  DEFAULT_ICON_HEIGHT,
  DEFAULT_ICON_WIDTH,
} from '../../../constants/icon.constants';

export interface CloseIconProps extends BaseIconProps {}

const CloseIcon: FC<CloseIconProps> = ({ ...props }) => {
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
          d="m2.397 2.554l.073-.084a.75.75 0 0 1 .976-.073l.084.073L8 6.939l4.47-4.47a.75.75 0 1 1 1.06 1.061L9.061 8l4.47 4.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L8 9.061l-4.47 4.47a.75.75 0 0 1-1.06-1.061L6.939 8l-4.47-4.47a.75.75 0 0 1-.072-.976l.073-.084l-.073.084Z"
        />
      </svg>
    </>
  );
};

export default CloseIcon;
