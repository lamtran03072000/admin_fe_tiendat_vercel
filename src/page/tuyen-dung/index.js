import React from 'react';
import Banner from './component/banner';
import TaiSaoLamViec from './component/tai-sao-lam-viec';
import CacViTriTuyenDung from './component/cac-vi-tri-tuyen-dung';
import ContainerSection from '../../HOC/container-section';
import GiaTri from './component/gia-tri';
import Carousel from './component/carousel';

const TuyenDung = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner Tuyển Dụng'}>
        <Banner />
      </ContainerSection>
      <ContainerSection nameSection={'Tại sao làm việc'}>
        <TaiSaoLamViec />
      </ContainerSection>

      <ContainerSection nameSection={'Giá trị tại đại tiến đạt'}>
        <GiaTri />
      </ContainerSection>

      <ContainerSection nameSection={'Carousel'}>
        <Carousel />
      </ContainerSection>

      <ContainerSection nameSection={'Các vị trí tuyển dụng'}>
        <CacViTriTuyenDung />
      </ContainerSection>
    </div>
  );
};

export default TuyenDung;
