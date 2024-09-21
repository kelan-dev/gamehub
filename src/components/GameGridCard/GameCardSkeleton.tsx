import css from "./GameCardSkeleton.module.css";
import LoadingSpinner from "../LoadingSpinner";

export default function GameCardSkeleton() {
  return (
    <div className={css.container}>
      <LoadingSpinner />
    </div>
  );
}
