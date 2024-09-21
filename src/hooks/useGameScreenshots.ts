import ms from "ms";
import { Screenshot } from "../interfaces/Screenshot";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import { useQuery } from "@tanstack/react-query";

// https://api.rawg.io/docs/#operation/games_screenshots_list

interface Parameters {
  slug: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Screenshot[];
}

export default function useGameScreenshots(parameters: Parameters) {
  const endpoint = `${Endpoint.Games}/${parameters.slug}/screenshots`;
  const key = [Endpoint.Games, parameters.slug, "screenshots"];

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
