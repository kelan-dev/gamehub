import css from "./GameInformation.module.css";
import clsx from "clsx";
import Game from "../../interfaces/Game";

interface Props {
  className?: string;
  game: Game;
}

export default function GameInformation({ className, game }: Props) {
  return (
    <div className={clsx(css.container, className)}>
      <div className={css.gameInfo}>
        <div className={css.headings}>
          <p>Metacritic:</p>
          <p>Genres:</p>
          <p>Released:</p>
          <p>Developer:</p>
          <p>Website:</p>
        </div>
        <div className={css.values}>
          <p>{game.metacritic}</p>
          <p>
            {game.genres.reduce((acc, cur, idx) => {
              return idx === 0 ? cur.name : `${acc}, ${cur.name}`;
            }, "")}
          </p>
          <p>{game.released}</p>
          <p>{game.developers[0].name}</p>
          <p>
            <a href={game.website} target="_blank">
              {game.website}
            </a>
          </p>
        </div>
        <div className={css.tags}>
          {game.tags?.map((tag) => (
            <p key={tag.slug} className={css.tag} onClick={() => null}>
              {tag.name}
            </p>
          ))}
        </div>
      </div>
      <p className={css.description}>{game.description_raw}</p>
    </div>
  );
}
