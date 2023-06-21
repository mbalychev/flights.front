import { Layout, Menu } from "antd";
import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const LayoutMenu = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '/flights',
      label: 'Онлайн табло',
    },
    {
      key: '/bookings',
      label: 'Бронирование',
    }
  ]

  const select = (keyPath: string) => {
    navigate(keyPath);
    console.log(`${keyPath} `);
  }

  return (
    // <Layout className="layout">
    <Header style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <HeaderLeftContainer style={{ color: 'whitesmoke' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items} onClick={({ key, keyPath }) => select(keyPath.toString())}>
        </Menu>
      </HeaderLeftContainer>
    </Header>
  )
}