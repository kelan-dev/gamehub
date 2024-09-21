import axios, { AxiosRequestConfig } from "axios";

export enum Endpoint {
  Games = "/games",
  Genres = "/genres",
  Platforms = "/platforms/lists/parents",
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
});

class AxiosClientRawg {
  get = <Response>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<Response>(endpoint, config).then((response) => response);
}

export default new AxiosClientRawg();
