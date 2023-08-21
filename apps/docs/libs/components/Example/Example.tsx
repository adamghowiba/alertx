import React, { FC } from 'react';

export interface ExampleProps {}

const Example: FC<ExampleProps> = ({ ...props }) => {
  return (
    <>
      <button>Click me</button>

      <style jsx>{``}</style>
    </>
  );
};

export default Example;
