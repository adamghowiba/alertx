import { render } from '@testing-library/react';

import ReactAlertx from './react-alertx';

describe('ReactAlertx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAlertx />);
    expect(baseElement).toBeTruthy();
  });
});
