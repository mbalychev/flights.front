import { Layout } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from 'styled-components';


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

export const LayoutPage = () => {
    return (
        <Container className="documents">
            <Layout>
                <StyledHeader className="site-layout-background">
                    <HeaderLeftContainer>
                        {/* <Logo src={logo} alt="Logo"/> */}
                        <Link to={'/flights'}>
                            Организации
                        </Link>
                    </HeaderLeftContainer>
                </StyledHeader>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: 16,
                            padding: 24,
                            minHeight: 280,
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Container>

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