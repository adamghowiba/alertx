import { render } from '@testing-library/react';

import ReactAlertxV2 from './react-alertx-v2';

describe('ReactAlertxV2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAlertxV2 />);
    expect(baseElement).toBeTruthy();
  });
});
