import { IBaseProps, IEpisode } from '../models';

interface IEpisodeProps extends IBaseProps {
    episode: IEpisode;
}

export function EpisodeView(props: IEpisodeProps) {
  return <div className="card">
  <div className="card-body">
    <h5 className="card-title">{props.episode.name}</h5>
    <div className="card-text">
        <dl>
            <dt>Air Date</dt>
            <dd>{props.episode.air_date}</dd>
            <dt>Episode</dt>
            <dd>{props.episode.episode}</dd>
        </dl>
    </div>
  </div>
</div>
}