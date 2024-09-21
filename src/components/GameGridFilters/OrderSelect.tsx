import Select, { SelectListItem } from "../Select";
import { SortAscending } from "@phosphor-icons/react";
import {
  useGameListQueryActions,
  useGameListQueryParameters,
} from "../../stores/GameListQueryStore";
import {
  getSlug,
  getLabel,
  reverse,
  slugsMatch,
} from "../../utils/order-helpers";

const options = [
  { value: 1, label: "Name" },
  { value: 2, label: "Release Date" },
  { value: 3, label: "Average Rating" },
  { value: 4, label: "Metacritic" },
];

const initial: SelectListItem = { value: "order", label: "Order By" };

export default function OrderSelect() {
  const { ordering } = useGameListQueryParameters();
  const { setOrdering } = useGameListQueryActions();

  const selected =
    options.find((o) => o.label === getLabel(ordering)) ?? initial;

  const handleSelect = (item: SelectListItem) => {
    setOrdering(
      slugsMatch(ordering, getSlug(item.label))
        ? reverse(ordering)
        : getSlug(item.label)
    );
  };

  return (
    <Select
      icon={SortAscending}
      label={selected.label}
      options={options}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}
