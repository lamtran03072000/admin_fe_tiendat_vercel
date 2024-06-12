import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Space, Tabs, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ImgFetch from '../../../../components/imgFetch';
import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const ListDesImg = ({ listIdImg, idSp, fetchSpApi }) => {
  const dispatch = useDispatch();
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleChange = async ({ fileList: newFileList }) => {
    let formImg = new FormData();
    formImg.append('file', newFileList[0].originFileObj);

    try {
      const dataImg = await imgUploadService.postImg(formImg, 0);

      await SanPhamService.postImgDesSp(dataImg.data.idImg, idSp);

      fetchSpApi();
      message.success('thành công upload hình');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleDelete = async (idImg) => {
    try {
      //   await thuVienHinhAnhService.deleteImg(idImg);
      await SanPhamService.deleteImgDesSp(idImg, idSp);
      fetchSpApi();
      message.success('xoá thành công');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const renderImg = () => {
    return listIdImg?.map((idImg, index) => {
      return (
        <Space
          key={index}
          direction="vertical"
          style={{
            border: '1px solid black',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <ImgFetch w={140} h={100} imgId={idImg} />
          <Button
            onClick={() => {
              handleDelete(idImg);
            }}
            type="primary"
            danger
          >
            Xoá
          </Button>
        </Space>
      );
    });
  };
  return (
    <div>
      <Space size={'large'} wrap>
        {renderImg()}
      </Space>

      <Upload
        listType="picture-card"
        customRequest={() => {}}
        showUploadList={false}
        onChange={handleChange}
        maxCount={1}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default ListDesImg;
