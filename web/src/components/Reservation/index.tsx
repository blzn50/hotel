import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Divider, Typography } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useStateValue } from '../../state';
import { TRoomInfo } from '../../types';
import PaymentForm from './PaymentForm';

const { Title } = Typography;

const Reserve: React.FC = () => {
  const history = useHistory();
  const [{ selectedRoomNumbers, selectedRooms, user, searchedData }, dispatch] = useStateValue();
  const [tempRoomInfo, setTempRoomInfo] = useState<TRoomInfo[]>([]);
  const [nights, setNights] = useState(1);
  const [dates, setDates] = useState<[string, string]>(['', '']);
  const [total, setTotal] = useState(0);
  const [guests, setGuests] = useState(1);

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
      const tempGuests = Object.values(searchedData).map((search) => search.guestNumber)[0];
      const nights = dayjs(tempDays[1]).diff(tempDays[0], 'd');
      const roomPricePerNight = tempRooms.reduce((sum, item) => sum + +item.price, 0);

      setTempRoomInfo(tempRooms);
      setDates(tempDays);
      setNights(nights);
      setTotal(nights * roomPricePerNight);
      setGuests(tempGuests);
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
            <CalendarOutlined /> {nights} night{nights > 1 ? 's' : ''}, <UserOutlined /> {guests}{' '}
            guest{guests > 1 ? 's' : ''}
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
            <div className="reservation-page__data-item">
              <Button
                type="default"
                className="reservation-page__change-room"
                onClick={handleChangeRoom}
              >
                Change Room
              </Button>
            </div>
          </Fragment>
        )}

        <Divider style={{ margin: '12px 0' }} />
        <div className="reservation-page__data-item" style={{ fontWeight: 600 }}>
          <div className="reservation-page__item-description">Total</div>
          <div className="reservation-page__item-value">{total}€</div>
        </div>

        {Object.values(user).map((usr) => (
          <div key={usr.user.email}>
            <PaymentForm
              fullName={`${usr.user.firstName} ${usr.user.lastName}`}
              handleReservation={handleReservation}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
