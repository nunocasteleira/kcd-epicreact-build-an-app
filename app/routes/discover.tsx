import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { DiscoverCharactersScreen } from "~/components/discover";
import type { Character } from "~/models/character.server";
import { getCharacters } from "~/models/character.server";
import styles from "@reach/tooltip/styles.css";
import type { User } from "~/services/auth.server";
import { authenticator } from "~/services/auth.server";
import { requireUser } from "~/services/session.server";
import { Button } from "~/components/button";

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
  await requireUser(request);
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

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
};

export default function DiscoverRoute() {
  const user = useLoaderData<User>();
  const actionData = useActionData<ActionData>();
  const characters = actionData?.data?.results;

  return (
    <>
      <div className="flex items-center absolute top-3 right-3">
        {user.username}
        <Form action={"/logout"}>
          <Button
            variant="secondary"
            className="ml-3"
            onClick={() => console.log("logout")}
          >
            Logout
          </Button>
        </Form>
      </div>
      <div className="my-0 mx-auto py-16 px-8 max-w-4xl w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr_3fr]">
        <DiscoverCharactersScreen characters={characters} />
      </div>
    </>
  );
}
