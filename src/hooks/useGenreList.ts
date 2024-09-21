import { useQuery } from "@tanstack/react-query";
import { Genre } from "../interfaces/Genre";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import ms from "ms";

// https://api.rawg.io/docs/#operation/genres_list

interface Parameters {
  ordering?: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}

export default function useGenreList(parameters?: Parameters) {
  return useQuery({
    queryKey: [Endpoint.Genres],
    queryFn: () => {
      return AxiosClientRawg.get<Response>(Endpoint.Genres, {
        params: {
          ...parameters,
        },
      }).then((response) => response.data.results);
    },
    staleTime: ms("10m"),
  });
}
