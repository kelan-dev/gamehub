import clsx from "clsx";
import css from "./OrderList.module.css";
import { SortAscending } from "@phosphor-icons/react";
import {
  getSlug,
  getLabel,
  reverse,
  slugsMatch,
} from "../../utils/order-helpers";
import {
  useGameListQueryActions,
  useGameListQueryParameters,
} from "../../stores/GameListQueryStore";

const options = ["Name", "Release Date", "Average Rating", "Metacritic"];

interface Props {
  className?: string;
  closeDrawer?: () => void;
}

export default function OrderList({ className, closeDrawer }: Props) {
  const { ordering } = useGameListQueryParameters();
  const { setOrdering } = useGameListQueryActions();

  const handleClick = (text: string) => {
    closeDrawer?.();
    setOrdering(
      slugsMatch(ordering, getSlug(text)) ? reverse(ordering) : getSlug(text)
    );
  };

  return (
    <div className={clsx(css.container, className)}>
      <h2 className={css.heading}>Order By</h2>
      {options.map((option) => (
        <ListItem key={option} onClick={handleClick} text={option} />
      ))}
    </div>
  );
}

interface ListItemProps {
  text: string;
  onClick: (text: string) => void;
}

function ListItem({ text, onClick }: ListItemProps) {
  const { ordering } = useGameListQueryParameters();

  const handleClick = () => {
    onClick(text);
  };

  const selected = ordering ? text === getLabel(ordering) : false;

  return (
    <div
      className={clsx(css.button, selected ? css.selected : "")}
      role="button"
      onClick={handleClick}
    >
      <SortAscending />
      <p>{text}</p>
    </div>
  );
}
