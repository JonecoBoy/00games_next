
import * as React from 'react'
import { useForm } from "react-hook-form";
import Form from '../src/components/form';

import Layout from '../src/layout/Layout';

const contact = ()=>{

  return (
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
  );
}
export default contact
