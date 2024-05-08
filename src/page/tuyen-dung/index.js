import React from 'react';
import Banner from './component/banner';
import TaiSaoLamViec from './component/tai-sao-lam-viec';
import CacViTriTuyenDung from './component/cac-vi-tri-tuyen-dung';
import ContainerSection from '../../HOC/container-section';

const TuyenDung = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner Tuyển Dụng'}>
        <Banner />
      </ContainerSection>
      <ContainerSection nameSection={'Tại sao làm việc'}>
        <TaiSaoLamViec />
      </ContainerSection>

      <ContainerSection nameSection={'Các vị trí tuyển dụng'}>
        <CacViTriTuyenDung />
      </ContainerSection>
    </div>
  );
};

export default TuyenDung;
