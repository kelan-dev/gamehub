import clsx from "clsx";
import css from "./PlatformList.module.css";
import usePlatformList from "../../hooks/usePlatformList";
import { Platform } from "../../interfaces/Platform";
import {
  useGameListQueryActions,
  useGameListQueryEntities,
} from "../../stores/GameListQueryStore";
import PlatformIcon from "../PlatformIcon";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import LoadingDots from "../LoadingDots";

interface Props {
  className?: string;
  closeDrawer?: () => void;
}

export default function PlatformList({ className, closeDrawer }: Props) {
  const [expanded, setExpanded] = useState(true);
  const { data, error, isLoading } = usePlatformList();
  const { setPlatform } = useGameListQueryActions();

  const handleClick = (platform: Platform) => {
    closeDrawer?.();
    setPlatform(platform);
  };

  if (isLoading) return <LoadingDots />;
  if (error) return <p>{`(error)`}</p>;

  return (
    <div className={clsx(css.container, className)}>
      <div
        className={clsx(css.button, css.heading, expanded ? css.expanded : "")}
        onClick={() => setExpanded(!expanded)}
      >
        <h2>Platforms</h2>
        <CaretDown className={css.caret} />
      </div>
      {expanded &&
        data?.map((platform) => (
          <ListItem
            key={platform.id}
            platform={platform}
            onClick={handleClick}
          />
        ))}
    </div>
  );
}

interface ListItemProps {
  platform: Platform;
  onClick: (platform: Platform) => void;
}

function ListItem({ platform, onClick }: ListItemProps) {
  const { platform: currentPlatform } = useGameListQueryEntities();

  const selected = platform === currentPlatform;

  return (
    <div
      key={platform.slug}
      role="button"
      className={clsx(css.listItem, css.button, selected ? css.selected : "")}
      onClick={() => onClick(platform)}
    >
      <PlatformIcon platform={platform} />
      <p>{platform.name}</p>
    </div>
  );
}
