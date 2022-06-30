import Tooltip from "@reach/tooltip";
import { Form, useTransition } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";
import type { Character } from "~/models/character.server";
import { CharacterRow } from "./character-row";
import { Input, Spinner } from "./lib";

function DiscoverCharactersScreen({
  characters,
}: {
  characters?: Character[];
}) {
  const transition = useTransition();
  const isLoading = Boolean(transition.submission);
  return (
    <div className="max-w-4xl mx-auto my-auto w-[90vw] py-10 px-0">
      <Form method="post">
        <Input
          placeholder="Search characters..."
          id="search"
          name="search"
          className="w-full"
        />
        <Tooltip label="Search Characters">
          <label htmlFor="search">
            <button
              type="submit"
              className="border-0 relative -ml-9 bg-transparent"
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </Form>

      {characters?.length ? (
        <ul className="mt-5 p-0 grid gap-4 grid-rows-[repeat(auto-fill,_minmax(100px,_1fr))]">
          {characters.map((character) => (
            <li key={character.id} aria-label={character.name}>
              <CharacterRow key={character.id} character={character} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No characters found. Try another search.</p>
      )}
    </div>
  );
}

export { DiscoverCharactersScreen };
