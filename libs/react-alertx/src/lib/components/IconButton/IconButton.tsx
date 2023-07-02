import React, { FC, PropsWithChildren, forwardRef } from 'react';
import styled from 'styled-components';

const IconButtonWrapper = styled.button<IconButtonProps>`
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s linear background-color;
  ${(props) => props.size === 'small' && `padding: 5px;`}

  ${(props) => props.size === 'medium' && `padding: 8px;`}

  ${(props) => props.size === 'large' && `padding: 12px;`}

  :hover {
    background-color: rgba(61, 61, 61, 0.05);
  }
`;

export interface IconButtonProps extends PropsWithChildren {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  size = 'medium',
  onClick,
  ...props
}) => {
  return (
    <>
      <IconButtonWrapper onClick={onClick} {...props} size={size}>
        {children}
      </IconButtonWrapper>
    </>
  );
};

export default IconButton;
