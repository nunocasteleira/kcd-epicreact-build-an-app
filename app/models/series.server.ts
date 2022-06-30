import type { Character } from "./character.server";
import type { Image } from "./image.server";

export type Series = {
  id: number;
  name?: string;
  title: string;
  description: string;
  resourceURI: string;
  urls: URL[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: Image;
  comics: any;
  stories: any;
  events: any;
  characters: Character[];
  creators: any;
  next: Series;
  previous: Series;
};
