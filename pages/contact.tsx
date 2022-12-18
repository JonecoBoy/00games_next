
import Head from 'next/head';
import * as React from 'react'
import { useForm } from "react-hook-form";
import Form from '../src/components/form';
import MetaTags from '../src/components/meta-tags';

import Layout from '../src/layout/Layout';

const contact = ()=>{

  return (
    <article>
      <MetaTags title={'Contact'} description={'Send a message to us. The game that you was searching not appear? tell us.'}/>
        <div className='background-form'>
    <Form title={`Submit a message`}/>
    <style jsx>
    {`

.background-form{
  background-color: rgba(81, 98, 213, 1);
  padding:15px;
  max-width:60%;
  display:flex;
  justify-content:center;
  justify-items:center;
  border-radius: 8px;
  margin:auto;
}
    `}
    </style>
    </div>
    </article>
  );
}
export default contact
