// import { Button2 } from '../../../libs/standalone-react/dist/esm';
// import { ReactRollup } from '../../../libs/react-rollup/dist/esm';
// import { AlertJsx } from '../../../dist/libs/react-alertx';
import { AlertJsx, AlertV2 } from '@alertx/react-alertx';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-jsx file.
   */
  return (
    <div>
      {/* <AlertJsx message="helo" /> */}
      <AlertV2 message="helo" />

      <style jsx>{`
        .page {
        }
      `}</style>
    </div>
  );
}

export default Index;
