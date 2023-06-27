import { Layout, Menu } from "antd";
import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { MdOutlineConnectingAirports } from 'react-icons/md';
import { PiTicketDuotone } from 'react-icons/pi';
import { CiAirportSign1 } from 'react-icons/ci';

const { Header } = Layout;

const iconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#200038',
};

export const LayoutMenu = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '/',
      icon: <CiAirportSign1 style={iconStyle} />,
      label: 'Домашняя'
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