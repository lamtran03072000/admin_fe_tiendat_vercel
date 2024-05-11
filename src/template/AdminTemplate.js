import React, { useState } from 'react';
import {
  HomeOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import Loading from '../components/loading';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to={'/'}>Home page</NavLink>, '1', <HomeOutlined />),
  getItem(<NavLink to={'/mailer'}>Mailer</NavLink>, '2', <MailOutlined />),
  getItem(
    <NavLink to={'/tuyen-dung'}>Tuyển dụng</NavLink>,
    '3',
    <UsergroupAddOutlined />,
  ),
  getItem(
    <NavLink to={'/san-pham'}>Sản phẩm</NavLink>,
    '4',
    <ProductOutlined />,
  ),
];
export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Loading />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
