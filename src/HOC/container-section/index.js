import React from 'react';
import { Badge, Card, Typography } from 'antd';
const { Title } = Typography;

const ContainerSection = ({ children, nameSection }) => {
  return (
    <Badge.Ribbon
      color="volcano"
      text={
        <span
          style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '30px' }}
        >
          {nameSection}
        </span>
      }
    >
      <Card
        size="small"
        style={{
          paddingTop: '20px',
          margin: '90px 10px',
          borderRadius: '20px',
          border: '1px solid black',
        }}
      >
        {children}
      </Card>
    </Badge.Ribbon>
  );
};

export default ContainerSection;
