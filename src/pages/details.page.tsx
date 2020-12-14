import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorView, Preloader } from '../common';
import { ApiContext } from '../contexts/app-context';
import { ICharacter, IEpisode } from '../lib';
import { CharacterInfo } from '../lib/character';
import { EpisodeList } from '../lib/episode';

interface IDetailsPageParams {
  id: string;
}

const EPISODES_COUNT_FOR_EACH_CALL = 6;

export function DetailsPage() {
  const params = useParams<IDetailsPageParams>();
  const characterId = parseInt(params.id);

  const [isLoading, setIsLoading] = useState(true);
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
      .catch(setError)
      .finally(() => setIsLoading(false));
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
    alert(character?.name + ' added to your cart.');
  };

  if (error) {
    return <ErrorView error={error.response?.data.error} />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (!character) {
    return <ErrorView error="Something went wrong!" />
  }
    return (
      <>
        <div className="row mt-5">
          <div className="col-md-4">
            <img alt={character.name} width="100%" src={character?.image} />
          </div>
          <div className="col-md-6">
            <CharacterInfo character={character} />
            <button onClick={buyMerchandise} className="btn btn-success">
              Buy merchandise
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <EpisodeList episodes={episodes} />
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
