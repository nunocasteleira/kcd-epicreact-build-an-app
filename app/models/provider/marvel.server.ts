import md5 from "blueimp-md5";

export async function fetchFromMarvel(
  pathname: string,
  searchParams = new URLSearchParams()
) {
  const url = new URL(`${process.env.API_URL ?? ""}${pathname}`);
  const ts = new Date().getTime();
  const privateKey = process.env.API_PRIVATE_KEY ?? "";
  const publicKey = process.env.API_PUBLIC_KEY ?? "";
  const hash = md5(ts + privateKey + publicKey);
  searchParams.append("ts", ts.toString());
  searchParams.append("apikey", publicKey);
  searchParams.append("hash", hash);

  url.search = searchParams.toString();

  return await fetch(url);
}
