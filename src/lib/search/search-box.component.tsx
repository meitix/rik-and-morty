import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts/app-context';
import { ISearchService, ICharacter, IBaseProps } from '../models';

interface ISearchProps extends IBaseProps {
  
}

export function SearchBox(props: ISearchProps) {
  const [keyword, setKeyword] = useState('');
  const [suggested, setSuggested] = useState<ICharacter[]>([]);
  const history = useHistory();
  const service  = useContext(ApiContext)
  const searchCharacter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push('/search/'+ keyword);
  };

  return (
    <div className={`col-9 mx-auto d-flex flex-column ${props.className}`}>
      <form onSubmit={(e) => searchCharacter(e)}>
        <input
          type="search"
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control"
          placeholder="Enter your character name..."
        />
        <button className="btn btn-primary btn-lg mt-3 justify-self-center">
          Search
        </button>
      </form>
    </div>
  );
}
