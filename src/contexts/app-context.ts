import { createContext } from "react";
import { ISearchService } from "../lib";


export const ApiContext = createContext<ISearchService | undefined>(undefined);
