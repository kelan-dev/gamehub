import Select, { SelectListItem } from "../Select";
import { FunnelSimple } from "@phosphor-icons/react";
import usePlatformList from "../../hooks/usePlatformList";
import SelectSkeleton from "../GameGridCard/SelectSkeleton";
import {
  useGameListQueryActions,
  useGameListQueryEntities,
} from "../../stores/GameListQueryStore";
import { Platform } from "../../interfaces/Platform";

const initial: SelectListItem = { value: "platform", label: "Platform" };

export default function PlatformSelect() {
  const { data, error, isLoading } = usePlatformList();
  const { platform } = useGameListQueryEntities();
  const { setPlatform } = useGameListQueryActions();

  if (error) return <p>(error)</p>;
  if (isLoading) return <SelectSkeleton />;

  const options: SelectListItem[] = [];
  data?.forEach((platform) => {
    options.push({
      value: platform.id,
      label: platform.name,
      object: platform,
    });
  });

  const selected = options.find((o) => o.value === platform?.id) ?? initial;

  const handleSelect = (item: SelectListItem) => {
    if (item.object) setPlatform(item.object as Platform);
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
