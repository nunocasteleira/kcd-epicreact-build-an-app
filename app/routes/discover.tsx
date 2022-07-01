import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { DiscoverCharactersScreen } from "~/components/discover";
import type { Character } from "~/models/character.server";
import { getCharacters } from "~/models/character.server";
import styles from "@reach/tooltip/styles.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type ActionData = {
  formError?: string;
  data?: {
    results?: Character[];
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const query = await body.get("search");
  if (typeof query !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }
  const response = await getCharacters(query);
  return json(response);
};

export default function DiscoverRoute() {
  const actionData = useActionData<ActionData>();
  const characters = actionData?.data?.results;

  return <DiscoverCharactersScreen characters={characters} />;
}
