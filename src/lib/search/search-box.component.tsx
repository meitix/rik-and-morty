import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IBaseProps } from '../models';

interface ISearchProps extends IBaseProps {
  
}

export function SearchBox(props: ISearchProps) {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  const searchCharacter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push('/character?name='+ keyword);
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
        <button className="btn btn-primary btn-lg mt-3 d-block mx-auto">
          Search
        </button>
      </form>
    </div>
  );
}
