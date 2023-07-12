import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineConnectingAirports } from 'react-icons/md';
import { PiTicketDuotone, PiAirplaneTilt, PiBookBold } from 'react-icons/pi';
import { LiaHomeSolid } from 'react-icons/lia';

const iconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#200038',
};

export const LayoutMenu = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '/',
      icon: <LiaHomeSolid style={iconStyle} />,
      label: 'Домашняя'
    },
    {
      key: 'thesaurus',
      icon: <PiBookBold style={iconStyle} />,
      label: 'справочник',
      children: [
        {
          key: '/airplans',
          icon: <PiAirplaneTilt style={iconStyle} />,
          label: 'Возд. суда',
        }]
    },
    {
      key: '/flights',
      icon: <MdOutlineConnectingAirports style={iconStyle} />,
      label: 'Все рейсы',
    },
    {
      key: '/bookings',
      icon: <PiTicketDuotone style={iconStyle} />,
      label: 'Бронирование',
    }
  ]

  const select = (keyPath: string) => {
    navigate(keyPath);
  }

  return (
    <Menu
      theme="light"
      style={{ background: 'rgba(0, 0, 0, 0)', textAlign: 'left' }}
      mode="inline"
      items={items} onClick={({ key, keyPath }) => select(keyPath.toString())}>
    </Menu >
  )
}