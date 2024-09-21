import { useGameListQueryActions } from "../../stores/GameListQueryStore";
import css from "./ResetFilters.module.css";

export default function ResetFilters() {
  const { reset } = useGameListQueryActions();

  return (
    <div className={css.container}>
      <button className={css.reset} onClick={reset}>
        ❌ Clear Filters
      </button>
    </div>
  );
}
