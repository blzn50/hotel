import React, { Fragment } from 'react';
import { Card, Image, Typography, Button } from 'antd';
import { useStateValue } from '../../state';
import { Room } from '../../types';
import singleBed from '../../assets/images/single-bed.jpg';
import Search from '../Search';

const { Title, Paragraph } = Typography;

const SearchResult: React.FC = () => {
  const [{ rooms }] = useStateValue();

  return (
    <div className="search-result">
      <Search searchResultPage={true} />

      {Object.values(rooms).length > 0 ? (
        Object.values(rooms).map((room: Room) => (
          <Card className="search-result__card" key={room.id} hoverable>
            <div className="search-result__card-inner">
              <Card.Grid
                className="search-result__card-grid card-search__image-container"
                hoverable={false}
              >
                <Image className="search-result__card-image" alt={room.type} src={singleBed} />
              </Card.Grid>
              <Card.Grid
                className="search-result__card-grid card-search__text-container"
                hoverable={false}
              >
                <div className="search-result__card-description">
                  <Title level={2}>{room.name}</Title>
                  <div className="search-result__card-description__price">
                    € {room.price} per night
                  </div>
                  <div className="search-result__card-description__span">
                    including taxes and charges
                  </div>
                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    className="search-result__card-description__description"
                  >
                    {room.description}
                  </Paragraph>
                  <Button
                    color="success"
                    style={{ float: 'right', marginTop: '0.5rem' }}
                    type="primary"
                  >
                    Select Room
                  </Button>
                </div>
              </Card.Grid>
            </div>
          </Card>
        ))
      ) : (
        <div className="search-result__card">
          Unfortunately we do not have any room available. Please check back later.
        </div>
      )}
    </div>
  );
};

export default SearchResult;
