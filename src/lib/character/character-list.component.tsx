import React, { Fragment } from 'react';
import { ICharacter } from '..';
import { CharacterCard } from './character-card.component';

export function CharacterList(props: { characters: ICharacter[] }) {
  const { characters } = props;
  if (characters && characters.length) {
    return (
      <Fragment>
        {characters.map((character) => (
          <div key={character.id} className="col-md-4 mt-4">
            <CharacterCard key={character.id} character={character} />
          </div>
        ))}
      </Fragment>
    );
  }
  return <div className="text-center">Nothing to show!</div>;
}
