import css from "./GameGridFilters.module.css";
import clsx from "clsx";
import OrderSelect from "./OrderSelect";
import PlatformSelect from "./PlatformSelect";
import GenreSelect from "./GenreSelect";
import ResetFilters from "./ResetFilters";

interface Props {
  className?: string;
}

export default function GameGridFilters({ className }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <div className={css.buttons}>
        <OrderSelect />
        <PlatformSelect />
        <GenreSelect />
        <ResetFilters />
      </div>
    </div>
  );
}
