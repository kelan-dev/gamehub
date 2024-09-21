import css from "./GameGridHeading.module.css";
import {
  useGameListQueryEntities,
  useGameListQueryParameters,
} from "../../stores/GameListQueryStore";

interface Props {
  className?: string;
}

export default function GameGridHeading({ className }: Props) {
  const { search } = useGameListQueryParameters();
  const { platform, genre } = useGameListQueryEntities();

  const getHeading = () => {
    if (search) return "Search results";
    if (!platform && !genre) return "New and trending";

    let heading = "";
    if (platform?.name) heading += platform.name + " ";
    if (genre?.name) heading += genre.name + " ";
    heading += "Games";
    return heading;
  };

  const getSubheading = () => {
    if (search) return `Showing games related to "${search}"`;
    if (!platform?.name && !genre?.name)
      return "Based on player counts and release date";
    return "Based on your search filters";
  };

  return (
    <div className={className}>
      <h1 className={css.heading}>{getHeading()}</h1>
      <p>{getSubheading()}</p>
    </div>
  );
}
