/* eslint-disable-next-line */
export interface LoaderProps {}

export function Loader() {
  return (
    <span
      className="loading loading-dots loading-lg"
      data-testid="loading"
    ></span>
  );
}

export default Loader;
