import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { imgUploadService } from '../../service/imgUpload';

const ImgFetch = ({ imgId, w, h }) => {
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    const fetchImg = async () => {
      try {
        let data = await imgUploadService.getImg(imgId);
        setImgSrc(data.data.img);
      } catch (error) {
        // Bạn có thể thiết lập một ảnh mặc định khi có lỗi
        setImgSrc('');
      }
    };

    fetchImg();
  }, [imgId]);
  return <Image width={w} height={h} src={imgSrc} />;
};

export default ImgFetch;
