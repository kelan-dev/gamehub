import css from "./TagFilter.module.css";
import {
  useGameListQueryActions,
  useGameListQueryParameters,
} from "../../stores/GameListQueryStore";

interface TagProps {
  slug: string;
}

const Tag = ({ slug }: TagProps) => {
  const { removeTag } = useGameListQueryActions();

  return (
    <div className={css.tag}>
      <span className={css.name}>{slug}</span>
      <button className={css.close} onClick={() => removeTag(slug)}>
        &times;
      </button>
    </div>
  );
};

export default function TagFilter() {
  const { tags } = useGameListQueryParameters();

  if (!tags) return null;

  const currentTags = tags?.split(",") || [];

  return (
    <div className={css.container}>
      {currentTags.map((tag) => (
        <Tag key={tag} slug={tag} />
      ))}
    </div>
  );
}
