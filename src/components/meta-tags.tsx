import Head from "next/head"

export type MetaTagsProps={
    title:string;
    description:string;
}

const MetaTags= ({title,description}:MetaTagsProps)=>{
  const metaTitle = title + '|00Games'
return(
    <Head>
   <title>{metaTitle}</title>
  <meta name='description' content={description} />
  <meta property='og:title' content='Joneco' />
  <meta
    property='og:description'
    content='Base de dados de video games'
  />
  <meta property='og:url' content='https://00games.com.br/' />
  <meta property='og:type' content='website' />
  <link rel='icon' href='/favicon.ico' />
</Head>
)
}

export default MetaTags