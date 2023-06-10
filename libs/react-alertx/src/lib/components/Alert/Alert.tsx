import React, { FC } from 'react';

export interface AlertProps {}

export const Alert: FC<AlertProps> = ({ ...props }) => {
  return (
    <>
      <h2>Alert!</h2>
      <style jsx>{``}</style>
    </>
  );
};
