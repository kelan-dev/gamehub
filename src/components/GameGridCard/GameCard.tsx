import css from "./GameCard.module.css";
import clsx from "clsx";
import { useState } from "react";
import Game from "../../interfaces/Game";
import Backdrop from "./Backdrop";
import MediaContainer from "./MediaContainer";
import HeaderContainer from "./HeaderContainer";
import DetailsContainer from "./DetailsContainer";
import { useGameListQuerySubscription } from "../../stores/GameListQueryStore";

interface Props {
  game: Game;
  style?: { [key: string]: string };
}

export default function GameCard({ game, style }: Props) {
  const [expanded, setExpanded] = useState(false);

  useGameListQuerySubscription({
    onAddTag: () => setExpanded(false),
  });

  return (
    <>
      <Backdrop show={expanded} onClick={() => setExpanded(false)} />
      <article
        style={style}
        className={clsx(css.container, expanded ? css.expanded : "")}
        onMouseLeave={() => setExpanded(false)}
        tabIndex={0}
      >
        <MediaContainer className={css.media} src={game.background_image} />

        <HeaderContainer className={css.header} game={game} />

        <DetailsContainer expanded={expanded} game={game} />

        <div
          onClick={() => setExpanded(true)}
          className={css.viewMoreContainer}
          tabIndex={0}
        >
          <p className={css.viewMore}>View More</p>
        </div>
      </article>
    </>
  );
}
