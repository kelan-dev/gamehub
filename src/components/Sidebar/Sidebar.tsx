import clsx from "clsx";
import css from "./Sidebar.module.css";
import usePlatformList from "../../hooks/usePlatformList";
import useGenreList from "../../hooks/useGenreList";
import { getCroppedImageUrl } from "../../utils/game-helpers";
import PlatformIcon from "../PlatformIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { Platform } from "../../interfaces/Platform";
import { Genre } from "../../interfaces/Genre";
import { useGameListQueryActions } from "../../stores/GameListQueryStore";
import LoadingDots from "../LoadingDots";

interface Props {
  className?: string;
}

export default function Sidebar({ className }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <h2>Platforms</h2>
      <PlatformList />
      <h2>Genres</h2>
      <GenreList />
    </div>
  );
}

function PlatformList() {
  const { data, error, isLoading } = usePlatformList();
  const { setPlatform } = useGameListQueryActions();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <LoadingDots />;

  if (error) return <p>{`(error)`}</p>;

  const handlePlatformClick = (platform: Platform) => {
    if (location.pathname !== "/") {
      navigate("/");
      setPlatform(platform, true);
    } else {
      setPlatform(platform);
    }
  };

  return (
    <div className={clsx(css.platformsContainer)}>
      {data?.map((p) => (
        <div
          key={p.slug}
          className={clsx(css.platform)}
          onClick={() => handlePlatformClick(p)}
        >
          <PlatformIcon platform={p} />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}

function GenreList() {
  const { data, error, isLoading } = useGenreList();
  const { setGenre } = useGameListQueryActions();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <LoadingDots />;

  if (error) return <p>{`(error)`}</p>;

  const handleGenreClick = (genre: Genre) => {
    if (location.pathname !== "/") {
      navigate("/");
      setGenre(genre, true);
    } else {
      setGenre(genre);
    }
  };

  return (
    <div className={clsx(css.genresContainer)}>
      {data?.map((g) => (
        <div
          key={g.slug}
          className={clsx(css.genre)}
          onClick={() => handleGenreClick(g)}
        >
          <img src={getCroppedImageUrl(g.image_background)} alt="" />
          <p>{g.name}</p>
        </div>
      ))}
    </div>
  );
}
