import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  ProductOutlined,
  ContactsOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from '../utils/constants';
import { logoutAction } from '../store/auth/userSlice';

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
  getItem(
    <NavLink to={'/lien-he'}>Liên hệ</NavLink>,
    '5',
    <ContactsOutlined />,
  ),
  getItem(<NavLink to={'/about'}>Về chúng tôi</NavLink>, '6', <FormOutlined />),
];
export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyLogin } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (keyLogin == loginStatus.fail) {
      navigate('/login');
    }
  }, [keyLogin]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const header = (
    <div>
      <Button
        onClick={() => {
          dispatch(logoutAction());
        }}
        icon={<LogoutOutlined />}
        type="primary"
        danger
      >
        Đăng xuất
      </Button>
    </div>
  );
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
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          {header}
        </Header>
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
