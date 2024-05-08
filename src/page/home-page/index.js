import React from 'react';
import Banner from './components/banner';
import LoiMoDau from './components/loiMoDau';
import ContainerSection from '../../HOC/container-section';

const HomePage = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner trang chủ'}>
        <Banner />
      </ContainerSection>

      <ContainerSection nameSection={'Lời mở đầu trang chủ'}>
        <LoiMoDau />
      </ContainerSection>
    </div>
  );
};

export default HomePage;
