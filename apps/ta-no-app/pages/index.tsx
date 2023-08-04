// import { Button2 } from '../../../libs/standalone-react/dist/esm';
// import { ReactRollup } from '../../../libs/react-rollup/dist/esm';
// import { AlertJsx } from '../../../dist/libs/react-alertx';
import { AlertJsx } from '@alertx/react-alertx';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-jsx file.
   */
  return (
    <div>
      <AlertJsx message="helo" />

      <div className="red">Shouldnt be touched</div>
      {/* <Bd`utton2>Hello</Bdutton2> */}

      {/* <ReactRollup /> */}

      <style jsx>{`
        .page {
        }
      `}</style>
    </div>
  );
}

export default Index;
