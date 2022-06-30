import md5 from "blueimp-md5";
import type { Image } from "./image.server";
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
  const url = new URL(`${process.env.API_URL ?? ""}/characters`);
  url.searchParams.append("nameStartsWith", query);
  const ts = new Date().getTime();
  const privateKey = process.env.API_PRIVATE_KEY ?? "";
  const publicKey = process.env.API_PUBLIC_KEY ?? "";
  const hash = md5(ts + privateKey + publicKey);
  url.searchParams.append("ts", ts.toString());
  url.searchParams.append("apikey", publicKey);
  url.searchParams.append("hash", hash);
  const res = await fetch(url);
  return await res.json();
}
