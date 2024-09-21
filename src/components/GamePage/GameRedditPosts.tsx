import css from "./GameRedditPosts.module.css";
import clsx from "clsx";
import Game from "../../interfaces/Game";
import useGameRedditPosts from "../../hooks/useRedditPosts";
import { FaRedditAlien } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
import { RedditPost } from "../../interfaces/RedditPost";

interface Props {
  className?: string;
  game: Game;
}

export default function GameRedditPosts({ className, game }: Props) {
  const {
    data: redditPosts,
    error,
    isLoading,
  } = useGameRedditPosts({
    slug: game.slug ?? "",
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>{`(Network error; couldn't load reddit posts)`}</p>;

  return (
    <div className={clsx(css.container, className)}>
      <Posts posts={redditPosts} />
    </div>
  );
}

interface PostsProps {
  posts: RedditPost[] | undefined;
}

function Posts({ posts }: PostsProps) {
  if (!posts) return null;
  if (posts.length === 0) return null;

  return (
    <>
      <h2>
        Check out the latest from Reddit <FaRedditAlien />
      </h2>
      <div className={clsx(css.redditPosts)}>
        {posts.map((post) => (
          <div key={post.id} className={clsx(css.redditPostContainer)}>
            <h3>
              <a href={post.url}>{post.name}</a>
            </h3>
            <p>
              <a href={post.username_url}>{post.username}</a>
            </p>
            <p>{post.created}</p>
          </div>
        ))}
      </div>
    </>
  );
}
