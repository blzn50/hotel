import React, { Fragment } from 'react';
import { Typography } from 'antd';
import { useStateValue } from '../../state';
import { Room } from '../../types';
import Search from '../Search';
import SearchResultItem from './SearchResultItem';

const { Title } = Typography;

const SearchResult: React.FC = () => {
  const [{ rooms, additionalRooms }] = useStateValue();

  return (
    <div className="search-result">
      <Search searchResultPage={true} />

      {Object.values(rooms).length > 0 ? (
        <Fragment>
          {Object.values(rooms).map((room: Room) => (
            <SearchResultItem room={room} key={room.id} />
          ))}
          {Object.values(additionalRooms).length > 0 ? (
            <div className="additional-search__result">
              <Title level={5} style={{ padding: '1.5rem', background: '#ffc53d' }}>
                We do not have necessary rooms you searched for. Here are some suggestions you might
                prefer.
              </Title>
              {Object.values(additionalRooms).map((additionalRoom: Room) => (
                <SearchResultItem room={additionalRoom} key={additionalRoom.id} />
              ))}
            </div>
          ) : (
            ''
          )}
        </Fragment>
      ) : (
        <div className="search-result__card">
          Unfortunately we do not have any room available. Please check back later.
        </div>
      )}
    </div>
  );
};

export default SearchResult;
