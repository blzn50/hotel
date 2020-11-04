import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { removeSelectedRoom, selectRoomToBook, useStateValue } from '../../state';
import { Room } from '../../types';
import Search from '../Search';
import SearchResultItem from './SearchResultItem';

const { Title } = Typography;

const SearchResult: React.FC = () => {
  const [{ rooms, additionalRooms, user, selectedRoomNumbers }, dispatch] = useStateValue();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (Object.values(user).length > 0) {
      // Object.values(user)[0];
      setUserEmail(Object.values(user)[0].user.email);
    }
  }, [user]);

  const handleSelectRoom = (roomNo: number, roomToSelect: Room) => {
    dispatch(selectRoomToBook(roomNo, roomToSelect));
  };

  const handleRemoveRoom = (roomNo: number) => {
    dispatch(removeSelectedRoom(roomNo));
  };

  return (
    <div className="search-result">
      <Search searchResultPage={true} />
      {selectedRoomNumbers.length > 0 ? (
        <Link to="/reservation">
          <Button
            type="primary"
            size="large"
            icon={<CalendarOutlined />}
            className="go-to__reservation"
          >
            Book Now
          </Button>
        </Link>
      ) : (
        ''
      )}
      {Object.values(rooms).length > 0 ? (
        <Fragment>
          {Object.values(rooms).map((room: Room) => (
            <SearchResultItem
              key={room.id}
              room={room}
              email={userEmail}
              selectRoom={handleSelectRoom}
              removeRoom={handleRemoveRoom}
              selectedRoom={selectedRoomNumbers}
            />
          ))}
          {Object.values(additionalRooms).length > 0 ? (
            <div className="additional-search__result">
              <Title level={5} style={{ padding: '1.5rem', background: '#ffc53d' }}>
                We do not have all the rooms you searched for. Here are some suggestions you might
                prefer.
              </Title>
              {Object.values(additionalRooms).map((additionalRoom: Room) => (
                <SearchResultItem
                  key={additionalRoom.id}
                  room={additionalRoom}
                  email={userEmail}
                  selectRoom={handleSelectRoom}
                  removeRoom={handleRemoveRoom}
                  selectedRoom={selectedRoomNumbers}
                />
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
