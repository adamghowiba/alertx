import { render } from '@testing-library/react';

import RollupTest from './rollup-test';

describe('RollupTest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RollupTest />);
    expect(baseElement).toBeTruthy();
  });
});
