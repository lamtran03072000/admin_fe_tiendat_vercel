import { Collapse } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import DanhSachSanPham from './components/danh-sach-san-pham';
const panelStyle = {
  marginBottom: 24,
  background: 'white',
  borderRadius: '10px',
  border: '1px solid black',
};
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const SanPham = () => {
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataListDssp, setDataListDssp] = useState([]);

  useEffect(() => {
    if (contentPage) {
      setDataListDssp(contentPage.dataSanPham);
    }
  }, [contentPage]);

  const getItemsDs = (panelStyle) => {
    return dataListDssp.map((ds, index) => {
      return {
        key: ds.id,
        label: ds.nameVn,
        children: <DanhSachSanPham dataDssp={ds.sanPham} />,
        style: panelStyle,
      };
    });
  };

  console.log('dataListDssp: ', dataListDssp);
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={
          {
            // background: 'black',
          }
        }
        items={getItemsDs(panelStyle)}
      />
    </div>
  );
};

export default SanPham;
