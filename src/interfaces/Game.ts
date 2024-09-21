import { Developer } from "./Developer";
import { Genre } from "./Genre";
import { Platform } from "./Platform";
import { Tag } from "./Tag";

// Note: The game objects returned by useGame and useGameList do not have identical structures.

export default interface Game {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  metacritic: number;
  metacritic_url: string;
  background_image: string;
  released: string;
  website: string;
  parent_platforms: { platform: Platform }[];
  rating: number;
  genres: Genre[];
  tags: Tag[];
  short_screenshots: { id: number; image: string }[];
  developers: Developer[];
}
