import css from "./GameGrid.module.css";
import useGameList from "../../hooks/useGameList";
import GameCard from "../GameGridCard/GameCard";
import GameCardSkeleton from "../GameGridCard/GameCardSkeleton";
import { useGameListQueryParameters } from "../../stores/GameListQueryStore";

export default function GameGrid() {
  const params = useGameListQueryParameters();
  const { data, error, isLoading } = useGameList(params);

  if (error) return renderError();

  return (
    <div className={css.container}>
      {isLoading && [...Array(20)].map((_e, i) => <GameCardSkeleton key={i} />)}
      {data?.results?.map((game, index) => (
        <GameCard
          key={game.id}
          game={game}
          style={{ animationDelay: index * 50 + "ms" }}
        />
      ))}
    </div>
  );

  function renderError() {
    return (
      <div className={css.error}>
        <p>Oops... Something went wrong {`:(`}</p>
        <p>Try refreshing the page, or try again later!</p>
      </div>
    );
  }
}
