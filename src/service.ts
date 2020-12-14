import { ICharacter, ICharacterSearchResult, IEpisode, ISearchService } from './lib';
import axios from 'axios';
import { API_DEFAULT_PAGESIZE, PAGE_SIZE } from './env';
import {isEqual } from 'lodash';

const INITIAL_BUFFER: ICharacterSearchResult = {
  info: { count: 0, pages: 0 },
  results: [],
};

export class ApiService implements ISearchService {

  private bufferedData = {
    characters: INITIAL_BUFFER,
    apiPageNumber: 0,
    filter: {}
  }
  constructor(protected urls: IApiUrls) {}

  async searchCharacters(filter: object = {}, pageNumber = 1, pageSize = PAGE_SIZE): Promise<ICharacterSearchResult> {
    const lastItemIndex = pageNumber * pageSize;
    const apiPageNumber = Math.ceil(lastItemIndex / API_DEFAULT_PAGESIZE);

    if (this.isBufferDeprecated(apiPageNumber, filter)) {
      await this.bufferRequiredData(filter, apiPageNumber);
    }

    const startIndex = ((pageNumber - 1) * pageSize) % API_DEFAULT_PAGESIZE;
    let endIndex = (pageNumber * pageSize) % API_DEFAULT_PAGESIZE;
    endIndex = endIndex === 0 ? API_DEFAULT_PAGESIZE : endIndex;
    
    const searchResult = this.bufferedData.characters.results.slice(startIndex, endIndex);
    return Promise.resolve({
      ...this.bufferedData.characters,
      results: searchResult,
    });
  }

  private isBufferDeprecated(apiPageNumber: number , filter: object) {
    return this.bufferedData.apiPageNumber !== apiPageNumber || !isEqual(filter, this.bufferedData.filter);
  }

  private async bufferRequiredData(filter: object, apiPageNumber: number) {
    const res = await axios.get<ICharacterSearchResult>(
      this.urls.characterUrl, { params: { ...filter, page: apiPageNumber } }
    );
    this.bufferedData.characters = res.data;
    this.bufferedData.apiPageNumber = apiPageNumber;
    this.bufferedData.filter = filter;
  }

  async getCharacter(id: number) {
    const res = await axios.get<ICharacter>(this.urls.characterUrl + id);
    return res.data;
  }

  getEpisodes(urls: string[]) {
    return Promise.all(urls.map((url) => axios.get<IEpisode>(url).then((res) => res.data)));
  }
}

export interface IApiUrls {
  characterUrl: string;
}
