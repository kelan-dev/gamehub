import { useQuery } from "@tanstack/react-query";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import Game from "../interfaces/Game";
import ms from "ms";

// https://api.rawg.io/docs/#operation/games_list

export interface Parameters {
  ordering?: string;
  parent_platforms?: string;
  genres?: string;
  tags?: string;
  search?: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export default function useGameList(parameters?: Parameters) {
  return useQuery({
    queryKey: [Endpoint.Games, parameters],
    queryFn: () => {
      return AxiosClientRawg.get<Response>(Endpoint.Games, {
        params: {
          ...parameters,
        },
      }).then((response) => response.data);
    },
    staleTime: ms("10m"),
  });
}
