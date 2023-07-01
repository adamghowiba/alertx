// import { AlertJsx as LocalAlertJsx } from '@alertx/react-alertx';
import { AlertJsx  as PackageAlertX} from 'alertx';
// import { AlertJsx as BuildAlertJsx } from '../../../dist/libs/react-alertx';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-jsx file.
   */
  return (
    <>
      {/* <BuildAlertJsx message="Alert with styled jsx" /> */}
      {/* <LocalAlertJsx message="Local JSX alert" /> */}
      <PackageAlertX message="Local JSX alert" />

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
