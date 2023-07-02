// import { AlertJsx as LocalAlertJsx } from '@alertx/react-alertx';
// import { AlertJsx  as PackageAlertX} from 'alertx';
// import { AlertJsx as BuildAlertJsx } from '../../../dist/libs/react-alertx';

// import { ReactAlertxV3 } from 'react-alertx-v3';
import { ReactAlertxV3 } from '../../../dist/libs/react-alertx-v3/index';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-jsx file.
   */
  return (
    <>
      {/* <LocalAlertJsx message="Local JSX alert" /> */}
      {/* <BuildAlertJsx message="Alert with styled jsx" /> */}
      {/* <PackageAlertX message="Local JSX alert" /> */}
      <ReactAlertxV3 />

      <h1>Hello</h1>
      <h1>Should remain black</h1>

      <style jsx>{`
        .page {
        }
      `}</style>
    </>
  );
}

export default Index;
