import { Button2 } from '../../../libs/standalone-react/dist/esm';
import { ReactRollup } from '../../../dist/libs/react-rollup';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-jsx file.
   */
  return (
    <div>
      <Button2>Hello</Button2>

      <ReactRollup />

      <style jsx>{`
        .page {
        }
      `}</style>
    </div>
  );
}

export default Index;
