import css from "./GamePage.module.css";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import GameImageGallery from "../components/GamePage/GameImageGallery";
import GameInformation from "../components/GamePage/GameInformation";
import GameRedditPosts from "../components/GamePage/GameRedditPosts";
import LoadingSpinner from "../components/LoadingSpinner";

export default function GamePage() {
  const params = useParams<{ slug: string }>();
  const { data: game, error, isLoading } = useGame({ slug: params.slug ?? "" });

  if (error) return renderError();
  if (isLoading) return renderIsLoading();
  if (!game) return null;

  return (
    <section className={css.container}>
      <h1 className={css.title}>{game.name}</h1>
      <GameImageGallery game={game} />
      <GameInformation game={game} />
      <hr />
      <GameRedditPosts game={game} />
    </section>
  );

  function renderError() {
    return (
      <div className={clsx(css.container, css.error)}>
        <p>Oops... Something went wrong {`:(`}</p>
        <p>Try refreshing the page, or try again later!</p>
      </div>
    );
  }

  function renderIsLoading() {
    return (
      <div className={clsx(css.container, css.isLoading)}>
        <LoadingSpinner />
        <p>Getting game details, one sec!</p>
      </div>
    );
  }
}
