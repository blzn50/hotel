import React from 'react';
import { Card, Image, Typography, Button } from 'antd';
import { Room } from '../../types';
import singleBed from '../../assets/images/single-bed.jpg';
import doubleBed from '../../assets/images/neonbrand-iAftdIcgpFc-unsplash.jpg';
import tripleBed from '../../assets/images/triple-bed.jpg';
import familyBed from '../../assets/images/family-room.jpg';
import suiteBed from '../../assets/images/hotel-suite.jpg';

interface Props {
  room: Room;
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

const SearchResultItem: React.FC<Props> = ({ room }) => {
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
            <div className="search-result__card-description__price">€ {room.price} per night</div>
            <div className="search-result__card-description__span">including taxes and charges</div>
            <Paragraph
              ellipsis={{ rows: 2 }}
              className="search-result__card-description__description"
            >
              {room.description}
            </Paragraph>
            <Button color="success" style={{ float: 'right', marginTop: '0.5rem' }} type="primary">
              Select Room
            </Button>
          </div>
        </Card.Grid>
      </div>
    </Card>
  );
};

export default SearchResultItem;
