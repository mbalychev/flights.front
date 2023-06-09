import { Anchor, Layout, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import { links } from "../Router";
import { useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Flights } from "./flights/flights";

const { Header, Content } = Layout;



const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const LayoutMenu = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '/flights',
      label: 'Part 1',
    },
    {
      key: 'part-2',
      label: 'Part 2',
    },
    {
      key: 'part-3',
      label: 'Part 3',
    },
  ]

  const select = (keyPath: string) => {
    navigate(keyPath);
    // links.flights();
    console.log(`${keyPath} `);
  }

  return (
    // <Layout className="layout">
    <Header style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <HeaderLeftContainer style={{ color: 'whitesmoke' }}>
        menu
        <Menu
          theme="dark"
          mode="horizontal"
          items={items} onClick={({ key, keyPath }) => select(keyPath.toString())}>
        </Menu>
        <Link to={'/flights'}>LINK </Link>
        <Link to={'/'}>Home </Link>
      </HeaderLeftContainer>
    </Header>
    // <Layout className="site-layout">
    /* <Content
      className="site-layout-background"

    >
      {/* <Outlet />
    </Content> */
    // </Layout>
    // </Layout>

    // <Layout>
    //     <div>
    //         <Link to={'/flights'}>
    //             Организации
    //         </Link>
    //     </div>
    //     <Layout className="site-layout">
    //         <Content
    //             className="site-layout-background"
    //             style={{
    //                 margin: 16,
    //                 padding: 24,
    //                 minHeight: 280,
    //             }}
    //         >
    //             <Outlet />
    //         </Content>
    //     </Layout>
    // </Layout>
  )
}