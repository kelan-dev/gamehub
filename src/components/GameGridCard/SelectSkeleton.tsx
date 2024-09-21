import css from "./SelectSkeleton.module.css";
import LoadingDots from "../LoadingDots";

export default function SelectSkeleton() {
  return (
    <div className={css.container}>
      <LoadingDots />
    </div>
  );
}
