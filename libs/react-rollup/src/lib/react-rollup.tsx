/* eslint-disable-next-line */
export interface ReactRollupProps {}

export function ReactRollup(props: ReactRollupProps) {
  return (
    <div>
      <h1>Welcome to ReactRollup!</h1>

      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
    </div>
  );
}

export default ReactRollup;
