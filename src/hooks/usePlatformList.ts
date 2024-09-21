import { useQuery } from "@tanstack/react-query";
import { Platform } from "../interfaces/Platform";
import AxiosClientRawg, { Endpoint } from "../services/AxiosClientRawg";
import ms from "ms";

// https://api.rawg.io/docs/#operation/platforms_list

interface Parameters {
  ordering?: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Platform[];
}

export default function usePlatformList(parameters?: Parameters) {
  return useQuery({
    queryKey: [Endpoint.Platforms],
    queryFn: () => {
      return AxiosClientRawg.get<Response>(Endpoint.Platforms, {
        params: {
          ...parameters,
        },
      }).then((response) => response.data.results);
    },
    staleTime: ms("10m"),
  });
}
