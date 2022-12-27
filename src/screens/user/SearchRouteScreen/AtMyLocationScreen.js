import React from 'react';
import { SEARCH_TYPE } from '../../../utils/Constants';
import SearchRouteScreen from './index';

const AtMyLocationScreen = (props) => {
  const { navigation } = props;
  const search_type = SEARCH_TYPE.AT_MY_LOCATION

  return (
    <>
      <SearchRouteScreen
        navigation={navigation}
        search_type={search_type}
      />
    </>
  )
}

export default AtMyLocationScreen;