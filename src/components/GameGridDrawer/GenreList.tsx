import clsx from "clsx";
import css from "./GenreList.module.css";
import useGenreList from "../../hooks/useGenreList";
import { Genre } from "../../interfaces/Genre";
import {
  useGameListQueryActions,
  useGameListQueryEntities,
} from "../../stores/GameListQueryStore";
import { getCroppedImageUrl } from "../../utils/game-helpers";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import LoadingDots from "../LoadingDots";

interface Props {
  className?: string;
  closeDrawer?: () => void;
}

export default function GenreList({ className, closeDrawer }: Props) {
  const [expanded, setExpanded] = useState(true);
  const { data, error, isLoading } = useGenreList();
  const { setGenre } = useGameListQueryActions();

  const handleClick = (genre: Genre) => {
    closeDrawer?.();
    setGenre(genre);
  };

  if (isLoading) return <LoadingDots />;
  if (error) return <p>{`(error)`}</p>;

  return (
    <div className={clsx(css.container, className)}>
      <div
        className={clsx(css.button, css.heading, expanded ? css.expanded : "")}
        onClick={() => setExpanded(!expanded)}
      >
        <h2>Genres</h2>
        <CaretDown className={css.caret} />
      </div>
      {expanded &&
        data?.map((genre) => (
          <ListItem key={genre.id} genre={genre} onClick={handleClick} />
        ))}
    </div>
  );
}

interface ListItemProps {
  genre: Genre;
  onClick: (genre: Genre) => void;
}

function ListItem({ genre, onClick }: ListItemProps) {
  const { genre: currentGenre } = useGameListQueryEntities();

  const selected = genre === currentGenre;

  return (
    <div
      key={genre.slug}
      role="button"
      className={clsx(css.listItem, css.button, selected ? css.selected : "")}
      onClick={() => onClick(genre)}
    >
      <img src={getCroppedImageUrl(genre.image_background)} alt="" />
      <p>{genre.name}</p>
    </div>
  );
}
