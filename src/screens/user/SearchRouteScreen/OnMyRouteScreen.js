import React from 'react';
import { SEARCH_TYPE } from '../../../utils/Constants';
import SearchRouteScreen from './index';

const OnMyRouteScreen = (props) => {
  const { navigation } = props;
  const search_type = SEARCH_TYPE.ON_MY_ROUTE

  return (
    <>
      <SearchRouteScreen
        navigation={navigation}
        search_type={search_type}
      />
    </>
  )
}

export default OnMyRouteScreen;