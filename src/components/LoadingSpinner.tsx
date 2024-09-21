import { TailSpin } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <TailSpin
      visible={true}
      height="32"
      width="32"
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
}
