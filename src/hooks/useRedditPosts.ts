import ms from "ms";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import { useQuery } from "@tanstack/react-query";
import { RedditPost } from "../interfaces/RedditPost";

// https://api.rawg.io/docs/#operation/games_reddit_read

interface Parameters {
  slug: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: RedditPost[];
}

export default function useGameRedditPosts(parameters: Parameters) {
  const endpoint = `${Endpoint.Games}/${parameters.slug}/reddit`;
  const key = [Endpoint.Games, parameters.slug, "reddit"];

  return useQuery({
    queryKey: key,
    queryFn: () => {
      return AxiosClientRawg.get<Response>(endpoint).then(
        (response) => response.data.results
      );
    },
    staleTime: ms("10m"),
  });
}
