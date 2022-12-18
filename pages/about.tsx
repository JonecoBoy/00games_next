import Head from 'next/head';
import * as React from 'react'
import MetaTags from '../src/components/meta-tags';

import Layout from '../src/layout/Layout';

const contact = ()=>{
     
  return (
    <article>
      <MetaTags title={'About'} description={'about the website'}/>
        <div className='background-form'>
          Video Game Database for lot of different systems.
    </div>
    </article>
  );
}
export default contact


