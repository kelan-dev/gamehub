import clsx from "clsx";
import css from "./HeaderContainer.module.css";
import Game from "../../interfaces/Game";
import PlatformIconList from "./PlatformIconList";
import meh from "../../assets/meh.webp";
import recommended from "../../assets/recommended.webp";
import exceptional from "../../assets/exceptional.webp";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  game: Game;
}

export default function HeaderContainer({ className, game }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <div className={css.platforms}>
        {game.parent_platforms && (
          <PlatformIconList parent_platforms={game.parent_platforms} />
        )}
        {game.rating >= 4 ? (
          <img src={exceptional} alt="" />
        ) : game.rating >= 3 ? (
          <img src={recommended} alt="" />
        ) : (
          <img src={meh} alt="" />
        )}
      </div>
      <Link className={css.link} to={`/game/${game.slug}`}>
        <h2 className={css.name}>{game.name}</h2>
      </Link>
    </div>
  );
}
