import React from 'react';
import { IBaseProps, IEpisode } from '../models';
import { EpisodeView } from './episode.component';

interface IEpisodeProps extends IBaseProps {
  episodes: IEpisode[];
}
export function EpisodeList(props: IEpisodeProps) {
  const { episodes } = props;
  return (
    <>
      {episodes.map((episode) => (
        <div key={episode.id} className="col-md-4 mb-5">
          <EpisodeView episode={episode} />
        </div>
      ))}
    </>
  );
}
