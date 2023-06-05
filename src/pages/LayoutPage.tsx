import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const LayoutPage = () => {
    return (
        <Layout>
            <div>
                <Link to={'/flights'}>
                    Организации
                </Link>
            </div>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: 16,
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}