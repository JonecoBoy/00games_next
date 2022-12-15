import * as React from "react"
import Layout from "../src/layout/Layout"
import Card from "../src/components/card"
import { cardParams } from "../src/components/card"


const teste = {
  name:"GameCube",
  img:'https://www.gamecash.fr/thumbnail-400-450/skies-of-arcadia-legends-us-e70705.jpg',
  slug:'game',
  releasedDate:2001,
  publisher:"Nintendo",
  generation:6,
  rate:3,
}

const IndexPage = () => {
  return (
    <>
    <h1>Skies of Arcadia</h1>
      <div className="technical">
        <img src ={teste.img}></img>
        <div className="text">
        <p>Release Date: 2002</p>
        <p>Publisher: Sega</p>
        <p>Platforms: GameCube, Dreamcast</p>
        <p>Genre: Role-Playing</p>
        <p>Mode: Single-Player</p>
        <p>Rate: 5</p>

        </div>
        </div>
        <div className="review">
        
        <div className="post-content">
        <h3>Sinopse</h3>
          <p><span className="drop-cap">C</span>apcom vs. SNK: Millennium Fight 2000 (カプコン バーサス エス・エヌ・ケイ ミレニアムファイト 2000 Kapukon Bāsasu Es-Enu-Kei Mireniamu Faito Nisen?), também conhecido como CvS, é um jogo eletrônico de video game do gênero luta desenvolvido e publicado pela empresa Capcom Co., Ltd. em 6 de setembro de 2000 para a plataforma Arcade. Logo depois, em 9 de novembro de 2000, lançado no japão para plataforma Dreamcast, com o título Capcom vs. SNK: Millennium Fight 2000 Pro (CvSPro).</p>

<p>O jogo também recebe uma versão para a plataforma PlayStation em 14 de agosto de 2001, sofrendo algumas mudanças de pouca relevância, pois já incluía os personagens Joe Higashi (Fatal Fury) e Dan Hibiki (Street Fighter Alpha), além dos novos golpes aos personagens já existentes e também novos modos de jogo da versão Dreamcast (novembro de 2000). Foi desenvolvido pela empresa Klein Computer Entertainment, publicado e distribuído por Capcom, para Estados Unidos e Europa com título resumido Capcom vs. SNK Pro, também no Japão com o mesmo título da versão Dreamcast.</p>

<p>Capcom vs. SNK é o segundo jogo pertencente à Série, que abrange personagens de jogos de luta mais famosos de ambas empresas(Crossover), como Street Fighter e The King of Fighters. Também é o primeiro jogo da série a possuir uma versão para Arcade.</p>
<h3>Jogabilidade</h3>
<p>Os controles são baseados em 8 direções e 4 botões de ataque, sendo eles dois para socos fraco e forte e dois para chutes fraco e forte. Seus comandos especiais são uma coletânea dos jogos principais das empresas, sendo como exemplos: "Super Jumps" (pulos mais altos que os normais), "Dash" (um impulso para frente ou trás), "Run" (comando de correr) e "Rolling" (comando de rolar; característica típica dos jogos da série KoF).</p>


<h3>Gameplay</h3>
<p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/R3wnFWsIt-w" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</p>

<h3>Screenshots</h3>
<p>
TODO
</p>

        </div>
        


      </div>
    <style jsx>
        {`

    .drop-cap {
        position: relative;
        display: block;
        float: left;
        line-height: 1;
        font-family: Georgia,serif !important;
        font-weight: 400 !important;
        font-size: 60px !important;
        font-family: Georgia,serif;
        font-weight: 700;
        margin-right: 5px;
    }

      .post-content {
        column-count: 2;
        column-gap: 50px;
        column-rule-color: rgba(40, 40, 50, 1);
        column-rule-width: 1px;
        column-rule-style: solid;
        /* text-indent: 10px; */
    }

    .post-content > p :nth-child(n+3){
      text-indent: 20px;
    }

        h1{
          text-align:center;
          justify-content:center;
        }

        h3 {
        color: rgba(255, 255, 255, 1);
        text-transform: uppercase;
        background: rgba(81, 98, 213, 1);
        padding: 6px;
        padding-right: 10px;
        padding-left: 10px;
        margin-bottom: 15px;
        display: inline-block;
          }
          p{
            margin-bottom:10px;
          }

          .text{
            margin-left:1em;
            vertical-align: middle;
            border: 4px solid #C4DBF6;
            align-self:center;
          }
          .technical p{
            font-size:2.5em;
            
          
          }

          .technical{
            
            display:flex;
            flex-direction:row;
            justify-content:center;
            flex-wrap:wrap;
            height:100%;
  
            border-bottom: 4px solid #C4DBF6;
            padding:20px;
            
          }

          .review{
            margin-top:1em;
            display:grid;
            flex-direction:row;
            justify-content:flex-start;
            flex-wrap:wrap;
            padding:20px;
            min-width:600px;;
            
          }
          
        `}
    </style>
</>
    
  )

}

export default IndexPage
