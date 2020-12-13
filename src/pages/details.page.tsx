import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorView } from '../common';
import { ApiContext } from '../contexts/app-context';
import { ICharacter, IEpisode } from '../lib';
import { EpisodeView } from '../lib/episode/episode.component';

interface IDetailsPageParams {
  id: string;
}

const EPISODES_COUNT_FOR_EACH_CALL = 6;

export function DetailsPage() {
  const params = useParams<IDetailsPageParams>();
  const characterId = parseInt(params.id);

  const [error, setError] = useState<AxiosError>();
  const [character, setCharacter] = useState<ICharacter>();
  const [episodeIndexRange, setEpisodeIndexRange] = useState({ from: 0, to: 0 });
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const service = useContext(ApiContext);
  useEffect(() => {
    service
      ?.getCharacter(characterId)
      .then((character) => {
        setCharacter(character);
        if (character.episode && character.episode.length) {
          setEpisodeIndexRange({ from: 0, to: EPISODES_COUNT_FOR_EACH_CALL });
        }
      })
      .catch(setError);
  }, []);

  useEffect(() => {
    if (character && character.episode) {
      service
        ?.getEpisodes(character.episode.slice(episodeIndexRange.from, episodeIndexRange.to))
        .then((newEpisodes) => {
          setEpisodes([...episodes, ...newEpisodes]);
        });
    }
  }, [episodeIndexRange]);

  const showMoreEpisodes = () => {
    setEpisodeIndexRange({ from: episodeIndexRange.to, to: episodeIndexRange.to + EPISODES_COUNT_FOR_EACH_CALL });
  };

  const buyMerchandise = () => {
    alert('Merchandise was clicked.');
  };

  if (error) {
    return <ErrorView error={error.response?.data.error} />;
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-4">
          <img width="100%" src={character?.image} />
        </div>
        <div className="col-md-6">
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
          <button onClick={buyMerchandise} className="btn btn-success">
            Buy merchandise
          </button>
        </div>
      </div>
      <div className="row mt-5">
        {episodes.map((episode) => (
          <div key={episode.id} className="col-md-4 mb-5">
            <EpisodeView episode={episode} />
          </div>
        ))}
      </div>
      <div className="row mb-5">
        {character && character?.episode?.length > episodes.length && (
          <div className="col text-center">
            <button onClick={showMoreEpisodes} className="btn btn-primary">
              Show More Episodes
            </button>
          </div>
        )}
      </div>
    </>
  );
}
