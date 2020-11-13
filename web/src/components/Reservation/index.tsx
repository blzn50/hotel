import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Divider, Typography } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useStateValue } from '../../state';
import { TRoomInfo } from '../../types';
import PaymentForm from './PaymentForm';

const { Title, Text } = Typography;

const Reserve: React.FC = () => {
  const history = useHistory();
  const [{ selectedRoomNumbers, selectedRooms, user, searchedData }, dispatch] = useStateValue();
  const [tempRoomInfo, setTempRoomInfo] = useState<TRoomInfo[]>([]);
  const [nights, setNights] = useState(1);
  const [dates, setDates] = useState<[string, string]>(['', '']);
  const [totalPrice, setTotalPrice] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [enoughTotalRoomCapacity, setEnoughTotalRoomCapacity] = useState(false);

  useEffect(() => {
    if (Object.values(selectedRooms).length > 0) {
      const tempRooms: TRoomInfo[] = Object.values(selectedRooms).map((selectedRoom) => {
        return {
          id: selectedRoom.id,
          name: selectedRoom.name,
          maxCapacity: selectedRoom.maxCapacity,
          price: selectedRoom.price,
        };
      });

      const tempDays = Object.values(searchedData).map((search) => search.dates)[0];
      const tempGuestCount = Object.values(searchedData).map((search) => search.guestNumber)[0];
      const nights = dayjs(tempDays[1]).diff(tempDays[0], 'd');
      const roomPricePerNight = tempRooms.reduce((sum, item) => sum + +item.price, 0);

      // check enough beds selected for the guests
      const tempTotalRoomCapacity = tempRooms.reduce((sum, item) => sum + +item.maxCapacity, 0);
      setEnoughTotalRoomCapacity(tempTotalRoomCapacity - tempGuestCount >= 0 ? true : false);

      setTempRoomInfo(tempRooms);
      setDates(tempDays);
      setNights(nights);
      setTotalPrice(nights * roomPricePerNight);
      setGuestCount(tempGuestCount);
    }
  }, [selectedRoomNumbers, selectedRooms, searchedData]);

  const handleChangeRoom = () => {
    history.push('/search');
  };

  const handleReservation = () => {};

  if (selectedRoomNumbers.length < 1) {
    return <Redirect to="/" />;
  }
  return (
    <div className="reservation-page">
      <Title level={3} style={{ textAlign: 'center' }}>
        Reservation Summary
      </Title>
      <div className="reservation-page__data">
        <div className="reservation-page__data-item">
          <div className="reservation-page__item-description">
            {dayjs(dates[0]).format('DD MMM, YYYY')} - {dayjs(dates[1]).format('DD MMM, YYYY')}
            <br />
            <CalendarOutlined /> {nights} night{nights > 1 ? 's' : ''}, <UserOutlined />{' '}
            {guestCount} guest{guestCount > 1 ? 's' : ''}
          </div>
        </div>
        {tempRoomInfo.length > 0 && (
          <Fragment>
            {tempRoomInfo.map((roomMiniInfo) => (
              <Fragment key={roomMiniInfo.id}>
                <div className="reservation-page__data-item">
                  <div className="reservation-page__item-description">{roomMiniInfo.name}</div>
                  <div className="reservation-page__item-value">{roomMiniInfo.price}€</div>
                </div>
              </Fragment>
            ))}
            <div className="reservation-page__data-item reservation-page__add-room">
              {enoughTotalRoomCapacity ? (
                <Button
                  type="default"
                  className="reservation-page__change-room"
                  onClick={handleChangeRoom}
                >
                  Change Room
                </Button>
              ) : (
                <Fragment>
                  <Text type="warning">You have not selected enough beds for the guests.</Text>

                  <Link to="/search">
                    <Button type="primary" className="go-to__reservation">
                      Add More Room
                    </Button>
                  </Link>
                </Fragment>
              )}
            </div>
          </Fragment>
        )}

        <Divider style={{ margin: '12px 0' }} />
        <div className="reservation-page__data-item" style={{ fontWeight: 600 }}>
          <div className="reservation-page__item-description">Total</div>
          <div className="reservation-page__item-value">{totalPrice}€</div>
        </div>

        {enoughTotalRoomCapacity
          ? Object.values(user).map((usr) => (
              <div key={usr.user.email}>
                <PaymentForm
                  fullName={`${usr.user.firstName} ${usr.user.lastName}`}
                  handleReservation={handleReservation}
                />
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default Reserve;
