import css from "./HomePage.module.css";
import GameGrid from "../components/GameGrid/GameGrid";
import GameGridHeading from "../components/GameGridHeading/GameGridHeading";
import GameGridFilters from "../components/GameGridFilters/GameGridFilters";
import GameGridDrawer from "../components/GameGridDrawer/GameGridDrawer";
import TagFilter from "../components/GameGridFilters/TagFilter";

export default function HomePage() {
  return (
    <section>
      <GameGridHeading className={css.gameGridHeading} />
      <GameGridDrawer className={css.gameGridDrawer} />
      <GameGridFilters className={css.gameGridFilters} />
      <TagFilter />
      <GameGrid />
    </section>
  );
}
