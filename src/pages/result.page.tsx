import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { CharacterList } from '../lib/character';
import { ErrorView, Preloader } from '../common';
import { ApiContext } from '../contexts/app-context';
import { ICharacterSearchResult } from '../lib';
import { AxiosError } from 'axios';
import ReactPaginate from 'react-paginate';
import { PAGE_SIZE } from '../env';
import qs from 'qs';
import {isEmpty} from 'lodash';
interface IResultPageParams {
  keyword: string;
}

export function ResultPage() {
  const location = useLocation();
  const query = {...qs.parse(location.search.replace('?', '')) as any};
  const page = parseInt(query.page || '1');
  delete query.page;
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<ICharacterSearchResult | null>(null);
  const [error, setError] = useState<AxiosError>();

  const service = useContext(ApiContext);
  const history = useHistory();
  
  function fetchData() {
    service
      ?.searchCharacters({ ...query }, page)
      .then((result) => {
        setSearchResult(result);
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [location]);

  const changePage = (selectedItem: { selected: number }) => {
    const q = {...query, page: selectedItem.selected + 1};
    history.push(location.pathname +'?'+ qs.stringify(q));
  };

  const clearFilter = () => {
   history.push(location.pathname.concat(`?page=${page}`))
  }

  if (error) {
    console.log(error);
    return <ErrorView error={error?.response?.data.error} />;
  }

  if (!searchResult?.results) {
    return <div className="text-center">Nothing Found...</div>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
    <div className="row mt-5">
      <div className="col">
       { !isEmpty(query) && <button className="btn btn-warning float-right" onClick={clearFilter}>Clear Filter</button>}
        <Link className="btn btn-secondary float-left" to={'/'}>Home</Link>
      </div>
    </div>
      <div className="row">
        <CharacterList characters={searchResult?.results} />
      </div>
      <nav className="mt-5">
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
          initialPage={page - 1}
          pageClassName={'page-item'}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
        />
      </nav>
    </>
  );
}
