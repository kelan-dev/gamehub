import css from "./DetailsContainer.module.css";
import { Fragment } from "react";
import Expandable from "./Expandable";
import Game from "../../interfaces/Game";
import { useGameListQueryActions } from "../../stores/GameListQueryStore";

interface Props {
  expanded: boolean;
  game: Game;
}

export default function DetailsContainer({ expanded, game }: Props) {
  const { setGenre, addTag } = useGameListQueryActions();

  return (
    <Expandable className={css.container} expanded={expanded}>
      <div className={css.detail}>
        <p>Release Date:</p>
        <p>{game.released}</p>
      </div>
      <div className={css.detail}>
        <p>Genres:</p>
        <div>
          {game.genres.map((genre, index) => (
            <Fragment key={genre.name}>
              {index > 0 && <span>{", "}</span>}
              <button className={css.genre} onClick={() => setGenre(genre)}>
                {genre.name}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={css.detail}>
        <p>Metacritic:</p>
        <p>{game.metacritic}</p>
      </div>
      <div className={css.tagsContainer}>
        {game.tags?.map((tag) => (
          <p
            key={tag.slug}
            className={css.tag}
            onClick={() => addTag(tag.slug)}
          >
            {tag.name}
          </p>
        ))}
      </div>
    </Expandable>
  );
}
