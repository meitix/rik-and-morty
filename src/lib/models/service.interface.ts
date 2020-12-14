import { ICharacter, ICharacterSearchResult } from "./character.interface";
import { IEpisode } from "./episode.interface";

export interface ISearchService {
    searchCharacters: (filter: object, pageNumber?: number, pageSize?: number) => Promise<ICharacterSearchResult>;
    getCharacter: (id: number) => Promise<ICharacter>;
    getEpisodes: (urls: string[]) => Promise<IEpisode[]>;
}