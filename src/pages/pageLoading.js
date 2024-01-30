import React from 'react';
import { BarLoader, DoubleOrbit } 
from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'

const PageLoading = () => {
  
    return <BarLoader text={"Loading..."} 
   style={{display:'flex'}}/>

};

export default PageLoading;
