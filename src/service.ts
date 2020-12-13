import { ICharacter, ICharacterSearchResult, IEpisode, ISearchService } from './lib';
import axios from 'axios';
import { API_DEFAULT_PAGESIZE, PAGE_SIZE } from './env';

const INITIAL_BUFFER: ICharacterSearchResult = {
  info: { count: 0, pages: 0 },
  results: [],
};

export class ApiService implements ISearchService {
  bufferedCharacters: ICharacterSearchResult = INITIAL_BUFFER;
  constructor(protected urls: IApiUrls) {}

  async searchCharacters(title: string, pageNumber = 1, pageSize = PAGE_SIZE): Promise<ICharacterSearchResult> {
    const lastItemIndex = pageNumber * pageSize;
    const apiPageNumber = Math.ceil(lastItemIndex / API_DEFAULT_PAGESIZE);
    // call server if requested data is not buffered
    if (lastItemIndex > this.bufferedCharacters.results.length) {
      const res = await axios.get<ICharacterSearchResult>(
        this.urls.characterUrl + `?name=${title}&page=${apiPageNumber}`
      );
      this.bufferedCharacters.results = this.bufferedCharacters.results.concat(res.data.results);
      this.bufferedCharacters.info = res.data.info;
    }

    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = pageNumber * pageSize;
    if (this.bufferedCharacters.results.length !== lastItemIndex) {
      // calculating the gap between requested data and buffered data.
      const gap = apiPageNumber * API_DEFAULT_PAGESIZE - this.bufferedCharacters.results.length;
      startIndex = startIndex - gap;
      endIndex = endIndex - gap;
    }

    const searchResult = this.bufferedCharacters.results.slice(startIndex, endIndex);
    return Promise.resolve({
      ...this.bufferedCharacters,
      results: searchResult,
    });
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
