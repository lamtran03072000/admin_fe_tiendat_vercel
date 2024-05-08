import { Space, Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  return (
    <div
      style={{
        position: 'fixed',
        display: isLoading ? '' : 'none',
        width: '100%',
        height: '100%',
        zIndex: '10000',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Loading;
