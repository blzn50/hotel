import React from 'react';
import { Card, Image, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Room } from '../../types';
import singleBed from '../../assets/images/single-bed.jpg';
import doubleBed from '../../assets/images/neonbrand-iAftdIcgpFc-unsplash.jpg';
import tripleBed from '../../assets/images/triple-bed.jpg';
import familyBed from '../../assets/images/family-room.jpg';
import suiteBed from '../../assets/images/hotel-suite.jpg';
import { Link } from 'react-router-dom';

interface Props {
  room: Room;
  email: string;
  selectRoom: (roomNo: number, room: Room) => void;
  removeRoom: (roomNo: number) => void;
  selectedRoom: number[];
}

const { Title, Paragraph } = Typography;

const IMAGE_URL: { [key: string]: string } = {
  single: singleBed,
  double: doubleBed,
  triple: tripleBed,
  family: familyBed,
  suite: suiteBed,
};

const selectBed = (type: string): string => {
  return IMAGE_URL[type];
};

const SearchResultItem: React.FC<Props> = ({
  room,
  email,
  selectRoom,
  removeRoom,
  selectedRoom,
}) => {
  return (
    <Card className="search-result__card" hoverable>
      <div className="search-result__card-inner">
        <Card.Grid
          className="search-result__card-grid card-search__image-container"
          hoverable={false}
        >
          <Image className="search-result__card-image" alt={room.type} src={selectBed(room.type)} />
        </Card.Grid>
        <Card.Grid
          className="search-result__card-grid card-search__text-container"
          hoverable={false}
        >
          <div className="search-result__card-description">
            <Title level={2}>{room.name}</Title>
            <div className="search-result__card-description__capacity">
              <UserOutlined /> {room.maxCapacity} people
            </div>
            <div className="search-result__card-description__price">€ {room.price} per night</div>
            <div className="search-result__card-description__span">including taxes and charges</div>
            <Paragraph
              ellipsis={{ rows: 2 }}
              className="search-result__card-description__description"
            >
              {room.description}
            </Paragraph>
            {email ? (
              selectedRoom.find((roomInArray) => roomInArray === room.roomNumber) ? (
                <Button
                  danger
                  style={{
                    float: 'right',
                    marginTop: '0.5rem',
                  }}
                  onClick={() => removeRoom(room.roomNumber)}
                >
                  Remove Selection
                </Button>
              ) : (
                <Button
                  style={{ float: 'right', marginTop: '0.5rem' }}
                  type="primary"
                  ghost
                  onClick={() => selectRoom(room.roomNumber, room)}
                >
                  Select Room
                </Button>
              )
            ) : (
              <div style={{ fontSize: '1rem', textAlign: 'center', textDecoration: 'underline' }}>
                Please{' '}
                <Link to={{ pathname: '/login', state: { redirectTo: '/search' } }}>Login</Link> /{' '}
                <Link to={{ pathname: '/register', state: { redirectTo: '/search' } }}>
                  Register
                </Link>{' '}
                to continue.
              </div>
            )}
          </div>
        </Card.Grid>
      </div>
    </Card>
  );
};

export default SearchResultItem;
