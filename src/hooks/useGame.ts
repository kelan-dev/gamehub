import { useQuery } from "@tanstack/react-query";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import Game from "../interfaces/Game";
import ms from "ms";

// https://api.rawg.io/docs/#operation/games_read

interface Parameters {
  slug: string;
}

type Response = Game;

export default function useGame(parameters: Parameters) {
  const endpoint = `${Endpoint.Games}/${parameters.slug}`;
  const key = [Endpoint.Games, parameters.slug];

  return useQuery({
    queryKey: key,
    queryFn: () => {
      return AxiosClientRawg.get<Response>(endpoint).then(
        (response) => response.data
      );
    },
    staleTime: ms("10m"),
  });
}
