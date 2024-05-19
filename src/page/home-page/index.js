import React from 'react';
import Banner from './components/banner';
import LoiMoDau from './components/loiMoDau';
import ContainerSection from '../../HOC/container-section';
import Number from './components/number';
import LinhVucUngDung from './components/linh-vuc-ung-dung';
import ThuVienHinhAnh from './components/thu-vien-hinh-anh';

const HomePage = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner trang chủ'}>
        <Banner />
      </ContainerSection>

      <ContainerSection nameSection={'Lời mở đầu trang chủ'}>
        <LoiMoDau />
      </ContainerSection>

      <ContainerSection nameSection={'Number'}>
        <Number />
      </ContainerSection>

      <ContainerSection nameSection={'Lĩnh vực ứng dụng'}>
        <LinhVucUngDung />
      </ContainerSection>

      <ContainerSection nameSection={'Thư viện hình ảnh'}>
        <ThuVienHinhAnh />
      </ContainerSection>
    </div>
  );
};

export default HomePage;
