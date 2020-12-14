import React from 'react'
import { IBaseProps, ICharacter } from '../models'

interface ICharacterInfoProps extends IBaseProps {
    character: ICharacter;
}

export function CharacterInfo(props: ICharacterInfoProps) {
    const {character} = props;
    return (
        <>
        <h1>{character?.name}</h1>
          <dl>
            <dt>Gender</dt>
            <dd>{character?.gender}</dd>
            <dt>Species</dt>
            <dd>{character?.species}</dd>
            <dt>Status</dt>
            <dd>{character?.status}</dd>
            <dt>Location</dt>
            <dd>{character?.location.name}</dd>
            <dt>Origin</dt>
            <dd>{character?.origin.name}</dd>
            {character && character.type && (
              <>
                <dt>Type</dt>
                <dd>{character?.type}</dd>
              </>
            )}
          </dl>
          </>
    )
}
