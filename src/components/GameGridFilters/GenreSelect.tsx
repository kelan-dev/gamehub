import Select, { SelectListItem } from "../Select";
import { FunnelSimple } from "@phosphor-icons/react";
import useGenreList from "../../hooks/useGenreList";
import SelectSkeleton from "../GameGridCard/SelectSkeleton";
import {
  useGameListQueryActions,
  useGameListQueryEntities,
} from "../../stores/GameListQueryStore";
import { Genre } from "../../interfaces/Genre";

const initial: SelectListItem = { value: "genre", label: "Genre" };

export default function GenreSelect() {
  const { data, error, isLoading } = useGenreList({ ordering: "name" });
  const { genre } = useGameListQueryEntities();
  const { setGenre } = useGameListQueryActions();

  if (error) return <p>(error)</p>;
  if (isLoading) return <SelectSkeleton />;

  const options: SelectListItem[] = [];
  data?.forEach((genre) => {
    options.push({
      value: genre.slug,
      label: genre.name,
      object: genre,
    });
  });

  const selected = options.find((o) => o.value === genre?.slug) ?? initial;

  const handleSelect = (item: SelectListItem) => {
    if (item.object) setGenre(item.object as Genre);
  };

  return (
    <>
      {options.length > 0 && (
        <Select
          icon={FunnelSimple}
          label={selected.label}
          options={options}
          selected={selected}
          onSelect={handleSelect}
        />
      )}
    </>
  );
}
