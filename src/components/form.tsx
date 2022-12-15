import { Alert } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({title}:{title:string})=>{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const url = 'https://webhook.site/1587ecf0-3adf-4161-924a-adfeb9972879';
  const onSubmit = async (data:any) => {
       
        await fetch(
            url,
            {
                method:'POST',
                body:JSON.stringify(data),
                mode:"no-cors",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response)=>{
            const state={
                message: 'Message Successfully sent',
                type: 'success'
            }
            Router.push({
                pathname: '/',
                query: { message: JSON.stringify(state) }
            })
        }).catch((e)=>{
            const state={
                message: 'ERROR: Message not sent',
                type: 'error'
            }
            Router.push({
                pathname: '/',
                query: { message: JSON.stringify(state) }
            })
        });
        
            
    
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{title}</h1>
        
      <label htmlFor="firstName">First Name</label>
      <input type="text" placeholder="First name" {...register("firstName", {required: true, maxLength: 15})} />
      {errors.firstName && <Alert severity="error">First Name must have a maximum of 15 chars</Alert>}
      <label htmlFor="lastName">Last Name</label>
      <input type="text" placeholder="Last name" {...register("lastName", {required: true, maxLength: 25})} />
      {errors.lastName && <Alert severity="error">Last Name must have a maximum of 25 chars</Alert>}
      <label htmlFor="email">Email</label>
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})}/>
          {errors.email && <Alert severity="error">Email not valid</Alert>}
      <label htmlFor="message">Message</label>
      <textarea {...register("message", {required: true, maxLength: 255})} />
      {errors.message && <Alert severity="error">Message must have a maximum of 255 chars</Alert>}
      <input type="submit" />

      <style jsx>
        {`
                    body {
            background: #0e101c;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
                "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
            }
                textarea {
                    resize: vertical;
                    width:100%
                    height:50px;
                }

                    form {
                    width:90%;
                    margin: 0 auto;
                    margin-bottom:20px;
                    }

                    h1 {
                    font-weight: 100;
                    color: white;
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgb(79, 98, 148);
                    }

                    .form {
                    background: #0e101c;
                    max-width: 400px;
                    margin: 0 auto;
                    }

                    p {
                    color: #bf1650;
                    }

                    p::before {
                    display: inline;
                    content: "⚠ ";
                    }

                    input, textarea {
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    border-radius: 4px;´
                    border: 1px solid white;
                    padding: 10px 15px;
                    margin-bottom: 10px;
                    font-size: 14px;
                    margin:auto
                    }

                    label {
                    line-height: 2;
                    text-align: left;
                    display: block;
                    margin-bottom: 13px;
                    margin-top: 20px;
                    color: white;
                    font-size: 14px;
                    font-weight: 200;
                    }

                    button[type="submit"],
                    input[type="submit"] {
                    background: #ec5990;
                    color: white;
                    text-transform: uppercase;
                    border: none;
                    margin-top: 40px;
                    padding: 20px;
                    font-size: 16px;
                    font-weight: 100;
                    letter-spacing: 10px;
                    }

                    button[type="submit"]:hover,
                    input[type="submit"]:hover {
                    background: #bf1650;
                    }

                    button[type="submit"]:active,
                    input[type="button"]:active,
                    input[type="submit"]:active {
                    transition: 0.3s all;
                    transform: translateY(3px);
                    border: 1px solid transparent;
                    opacity: 0.8;
                    }

                    input:disabled {
                    opacity: 0.4;
                    }

                    input[type="button"]:hover {
                    transition: 0.3s all;
                    }

                    button[type="submit"],
                    input[type="button"],
                    input[type="submit"] {
                    -webkit-appearance: none;
                    }


                    button[type="button"] {
                    display: block;
                    appearance: none;
                    background: #333;
                    color: white;
                    border: none;
                    text-transform: uppercase;
                    padding: 10px 20px;
                    border-radius: 4px;
                    }

                    pre {
                    color: white;
                    }

                    hr {
                    margin-top: 30px;
                    }

                    button {
                    display: block;
                    appearance: none;
                    margin-top: 40px;
                    border: 1px solid #333;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    padding: 10px 20px;
                    border-radius: 4px;
                    
                    }
        `}
    </style>
    </form>
  );
}

export default Form