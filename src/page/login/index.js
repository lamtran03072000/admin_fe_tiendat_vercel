import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/auth/userThunk';
import { loginStatus } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { keyLogin } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (keyLogin == loginStatus.success) {
      navigate('/');
    }
  }, [keyLogin]);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    dispatch(loginThunk(values));
    try {
    } catch (error) {}
  };
  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.susanaustin.com.au/wp-content/uploads/2014/03/12285681856_838c1079e1_o.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          background: 'white',
          padding: 50,
          borderRadius: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
