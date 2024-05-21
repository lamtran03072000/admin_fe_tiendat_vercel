import React from 'react';
import Banner from './components/banner';
import ContainerSection from '../../HOC/container-section';
import LienHeSection from './components/lien-he';
import ChinhSachThanhToan from './components/chinh-sach-thanh-toan';
import Zalo from './components/zalo';

const LienHe = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner trang liên hệ'}>
        <Banner />
      </ContainerSection>
      <ContainerSection nameSection={'Liên hệ'}>
        <LienHeSection />
      </ContainerSection>

      <ContainerSection nameSection={'Thông tin chính sách'}>
        <ChinhSachThanhToan />
      </ContainerSection>

      <ContainerSection nameSection={'Số điện thoại zalo'}>
        <Zalo />
      </ContainerSection>
    </div>
  );
};

export default LienHe;
