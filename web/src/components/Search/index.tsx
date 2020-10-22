import React, { Fragment } from 'react';
import { getSearchResult, useStateValue } from '../../state';
import { Room, SearchData } from '../../types';
import { baseApi } from '../../utils/httpUtils';
import SearchForm from './SearchForm';

const Search: React.FC = () => {
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
      const { data: searchResult } = await baseApi.post<Room[]>('/search', transformedValues);
      dispatch(getSearchResult(searchResult));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <SearchForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default Search;
