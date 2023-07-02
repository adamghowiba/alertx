import { render } from '@testing-library/react';

import ReactAlertxV3 from './react-alertx-v3';

describe('ReactAlertxV3', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAlertxV3 />);
    expect(baseElement).toBeTruthy();
  });
});
