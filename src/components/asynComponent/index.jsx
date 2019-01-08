
import React from 'react';
import './index.scss';

const AsynLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div className='aysn-load-status'>加载中...</div>;
    // return null;
  } else if (error) {
    return <div className='aysn-load-status'>页面加载失败</div>;
  } else {
    return null;
  }
};

export default AsynLoadingComponent;