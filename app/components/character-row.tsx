import type { Character } from "~/models/character.server";

function CharacterRow({ character }: { character: Character }) {
  const { name, description, thumbnail, series } = character;

  const id = `character-row-character-${character.id}`;

  return (
    <div className="flex items-center content-end relative">
      <div
        aria-labelledby={id}
        className="min-h-[270px] flex-grow-[2] grid grid-cols-[140px_1fr] gap-5 border-gray-200 text-gray-900 p-5 rounded hover:focus:shadow"
      >
        <div className="w-24 md:w-36">
          <img
            src={`${thumbnail.path}/portrait_medium.${thumbnail.extension}`}
            alt={name}
            className="max-h-full w-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <h2 id={id} className="text-lg m-0 text-indigo-700">
                {name}
              </h2>
            </div>
            <div className="ml-3 flex flex-col items-end">
              <div className="mt-2 italic text-sm text-right">{name}</div>
              <small>{series.items[0]?.name}</small>
            </div>
          </div>
          <small className="block whitespace-[break-spaces]">
            {description.substring(0, 500)}...
          </small>
        </div>
      </div>
    </div>
  );
}

export { CharacterRow };
