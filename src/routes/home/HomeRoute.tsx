import * as React from 'react';
import { FunctionComponent } from 'react';
import HomeAppBar from './components/HomeAppBar';

const HomeRoute: FunctionComponent = () => {
  return (
    <>
      <HomeAppBar />
      <div>
        <div style={{ height: '3000px' }}>testasdasd</div>
      </div>
    </>
  );
};

export default HomeRoute;
