import { Button, Card, Col, Image, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handdleRemoveSpMoTa,
  handleShowSpMoTa,
} from '../../../../store/SanPham/sanPhamSlice';

const ListSpMoTa = () => {
  const { dsSpMoTaAdd } = useSelector((state) => state.sanPhamSlice);
  const dispatch = useDispatch();
  return (
    <Row>
      {dsSpMoTaAdd?.map((sp, i) => {
        return (
          <Col span={6}>
            <Card cover={<Image src={sp.preview} height={80} />}>
              <p>{sp.des}</p>
              <Button
                onClick={() => {
                  dispatch(handleShowSpMoTa(sp));
                }}
                type="primary"
              >
                Sửa
              </Button>
              <Button
                onClick={() => {
                  dispatch(handdleRemoveSpMoTa(sp.id));
                }}
                type="primary"
              >
                Xoá
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ListSpMoTa;
