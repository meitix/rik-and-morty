import React from 'react';
import { Link } from 'react-router-dom';
import { ICharacter } from '..';

export function CharacterCard(props: { character: ICharacter }) {
  const { character } = props;
  return (
      <Link to={`/character/${character.id}`}>
    <div className="card">
      <img
        src={character.image}
        className="card-img-top"
        alt={character.name}
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text d-flex flex-column">
          <span>Episodes: {character.episode.length}</span>
          <span>Location: {character.location?.name}</span>
        </p>
      </div>
    </div>
    </Link>
  );
}
