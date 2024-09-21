import { ThreeDots } from "react-loader-spinner";

export default function LoadingDots() {
  return (
    <ThreeDots
      visible={true}
      height="16"
      width="16"
      ariaLabel="three-dots-loading"
    />
  );
}
