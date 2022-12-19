import { Alert } from '@mui/material'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import MetaTags from '../src/components/meta-tags'

 function Home(props:any) {


  return (
    <article>
      <MetaTags title={'Home'} description={'website main page'}/>
    <div className='main'>
      TODO COLOCAR AQUI UNS CARDS com infos do site e mostrando busca dos jogos consoles etc... caso contrario só clicar ali nos sistemas
    <style jsx>{`
        .message-spacer{
          margin-top:20px;
        }
      `}
    </style>
    </div>
    </article>
  )
}

export default Home