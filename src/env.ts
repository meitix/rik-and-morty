import { IApiUrls } from "./service";
const HOST =  'https://rickandmortyapi.com/api';

export const ApiUrls: IApiUrls = {
    characterUrl: `${HOST}/character/`
}

export const PAGE_SIZE = 5;
export const API_DEFAULT_PAGESIZE = 20;