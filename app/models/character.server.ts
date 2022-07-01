import type { Image } from "./image.server";
import { fetchFromMarvel } from "./provider/marvel.server";
import type { ResourceList } from "./resource-list.server";
import type { Series } from "./series.server";

export type Character = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: URL[];
  thumbnail: Image;
  comics: any;
  stories: any;
  events: any;
  series: ResourceList<Series>;
};

export async function getCharacters(query: string) {
  const searchParams = query
    ? new URLSearchParams({ nameStartsWith: query })
    : undefined;
  const res = await fetchFromMarvel("/characters", searchParams);
  return await res.json();
}
