import clsx from "clsx";
import css from "./SortFilterBar.module.css";
import OrderList from "./OrderList";
import PlatformList from "./PlatformList";
import GenreList from "./GenreList";

interface Props {
  className?: string;
  closeDrawer?: () => void;
}

export default function SortFilterBar({ className, closeDrawer }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <OrderList closeDrawer={closeDrawer} />
      <PlatformList closeDrawer={closeDrawer} />
      <GenreList closeDrawer={closeDrawer} />
    </div>
  );
}
