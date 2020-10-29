import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { getSearchResult, useStateValue } from '../../state';
import { Room, SearchData } from '../../types';
import { baseApi } from '../../utils/httpUtils';
import SearchForm from './SearchForm';

interface Props {
  searchResultPage: boolean;
}

const Search: React.FC<Props> = ({ searchResultPage }) => {
  const history = useHistory();
  const [_, dispatch] = useStateValue();
  const handleSubmit = async (values: SearchData) => {
    const transformedValues = {
      arrival: values.dates[0],
      departure: values.dates[1],
      guestNumber: values.guestNumber,
      noOfRoom: values.noOfRoom,
      roomType: values.roomType,
    };
    try {
      const {
        data: { data: searchResult, moreData: additionalSearchData },
      } = await baseApi.post<{ data: Room[]; moreData: Room[] }>('/search', transformedValues);
      // console.log('data: ', data);
      dispatch(getSearchResult(searchResult, additionalSearchData, values));
      history.push('/search');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <SearchForm onSubmit={handleSubmit} searchResultPage={searchResultPage} />
    </Fragment>
  );
};

export default Search;
