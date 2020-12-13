import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { CharacterList } from '../lib/character';
import { ErrorView } from '../common';
import { ApiContext } from '../contexts/app-context';
import { ICharacterSearchResult } from '../lib';
import { AxiosError } from 'axios';
import ReactPaginate from 'react-paginate';
import { PAGE_SIZE } from '../env';

interface IResultPageParams {
  keyword: string;
}

export function ResultPage() {
  const params = useParams<IResultPageParams>();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageQuery = query.get('page');
  const page = parseInt(pageQuery || '1');

  const [searchResult, setSearchResult] = useState<ICharacterSearchResult | null>(null);
  const [error, setError] = useState<AxiosError>();
  const service = useContext(ApiContext);
  const history = useHistory();

  useEffect(() => {
    service
      ?.searchCharacters(params.keyword, page)
      .then((result) => {
        setSearchResult(result);
      })
      .catch((e) => setError(e));
  }, [page, params]);

  if (error) {
    console.log(error);
    return <ErrorView error={error?.response?.data.error} />;
  }

  if (!searchResult?.results) {
    return <div className="text-center">Nothing Found...</div>;
  }


  const changePage = (selectedItem: {selected: number}) => {
    history.push(`${location.pathname}?page=${selectedItem.selected + 1}`,{})
  }


  return (
    <>
      <div className="row">
        <CharacterList characters={searchResult?.results} />
      </div>
      <div className="row">
      <nav>
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={Math.ceil(searchResult.info.count / PAGE_SIZE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={changePage}
          pageClassName={'page-item'}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
        />
        </nav>
      </div>
    </>
  );
}
