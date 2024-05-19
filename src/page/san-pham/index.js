import { Button, Collapse, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import DanhSachSanPham from './components/danh-sach-san-pham';
import ThemDanhSachSP from './components/them-danh-sach-sp';
import { SanPhamService } from '../../service/san-pham/SanPhamService';
import { getContentPageThunk } from '../../store/contentPage/contentPageThunk';
import ImgFetch from '../../components/imgFetch';
import ThemSanPham from './components/them-san-pham';
import SuaDanhSachSanPham from './components/sua-danh-sach-san-pham';
const panelStyle = {
  margin: '24px 0px',
  background: 'white',
  borderRadius: '10px',
  border: '1px solid black',
};

const SanPham = () => {
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataListDssp, setDataListDssp] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentPage) {
      setDataListDssp(contentPage.dataSanPham);
    }
  }, [contentPage]);

  const deleteDssp = async (id) => {
    try {
      await SanPhamService.deleteDssp(id);
      dispatch(getContentPageThunk());
      message.success('Xoá thành công');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getActionDSSP = (id) => (
    <Space>
      <Button
        onClick={(event) => {
          deleteDssp(id);
        }}
        type="primary"
        danger
      >
        Xoá
      </Button>
      <SuaDanhSachSanPham idDssp={id} />
      <ThemSanPham idDssp={id} />
    </Space>
  );

  const getItemsDs = (panelStyle) => {
    return dataListDssp.map((ds, index) => {
      return {
        key: ds.id,
        label: (
          <Space>
            <ImgFetch w={50} h={50} imgId={ds.img} />
            <span>{ds.nameVn}</span>
          </Space>
        ),
        children: <DanhSachSanPham dataDssp={ds.sanPham} />,
        style: panelStyle,
        extra: getActionDSSP(ds.id),
      };
    });
  };

  return (
    <div>
      <ThemDanhSachSP />
      <Collapse
        collapsible="icon"
        bordered={false}
        // defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <Button
            icon={
              <CaretRightOutlined
                style={{ fontSize: '30px', color: '#08c' }}
                rotate={isActive ? 90 : 0}
              />
            }
          >
            Xem chi tiết
          </Button>
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
