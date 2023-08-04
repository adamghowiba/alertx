'use client'

import React, { FC } from 'react';

export interface TestCompProps {}

const TestComp: FC<TestCompProps> = ({ ...props }) => {
  return (
    <>
      <h1 className="local-green">Hello This is green</h1>
      <style jsx>{`
        .local-green {
          color: green;
        }
      `}</style>
    </>
  );
};

export default TestComp;
