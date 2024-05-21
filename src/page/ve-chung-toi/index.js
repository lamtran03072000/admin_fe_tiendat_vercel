import React from 'react';
import ContainerSection from '../../HOC/container-section';
import Banner from './components/banner';
import Des from './components/des';
import GiaTriCotLoi from './components/core-value';

const VeChungToi = () => {
  return (
    <div>
      <ContainerSection nameSection={'Banner'}>
        <Banner />
      </ContainerSection>
      <ContainerSection nameSection={'Mô tả'}>
        <Des />
      </ContainerSection>

      <ContainerSection nameSection={'Giá trị cốt lõi'}>
        <GiaTriCotLoi />
      </ContainerSection>
    </div>
  );
};

export default VeChungToi;
