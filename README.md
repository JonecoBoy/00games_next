00GAMES

## URLS em produção

Strapi:

[http://joneco.dev.br:1337/](http://joneco.dev.br:1337/)

Aplicacao:
[https://00games.com.br/](https://00games.com.br/)


## Problemas

Infelizmente o netlify depois de um tempo forçou um SSL no meu dominio privado,  e o meu strapi está em http, todas as fotos simplesmente não aparecem no site por isso. Precisarei criar um container do nginx para lidar com o ssl.
como nesse exemplo: https://medium.com/@derrickmehaffy/using-strapi-in-production-with-https-717af82d1445
e também não alocou os meus sistemas no menu, porém está funcional e da pra abrir as imagens em outra aba.

Eu fiz a base de dados no mongo atlas, porem eu nao consegui de jeito nenhum mudar um parametro para colocar no nocector do mongo +srv, que e algum parametro do mongo. Simplesmente a imagem oficial do strapi nao deixa por esse parametro, tentei diversas formas e pesquisei e nada, logo perdi um bom tempo pois eu estava fazendo meu local todo nessa base. Criei uma base de mongo no meu servidor e pude de boa continnuar com o strapi, que tambem esta hospedado no meu servidor. porem, domingo vi que o prisma simplesmente nao funciona se o mongo nao tiver uma replica set... ele exige que seja possivel usar transaction, o mongo so aceita transactions se tiver replica set configurada pelo visto... por sorte a do mongo db atlas ja tem de natureza entao funcinou.
logo a base de dados que esta configurada no .env
```"mongodb+srv://client:nrPzxekxjFVtLIye@joneco.ch8krgj.mongodb.net/00games"```
é a do mongo db atlas que ficara os usuarios (ai o +srv que informei), apesar de ter umas collections ai de sistemas jogos etc...

## Rodar projeto dev

rodar o projeto como dev está 100%, ou mesmo buildando o mesmo e dando start.

no build já está rodando o prisma generate, porém no dev não, então rodar antes:
```
prisma generate
```

```
yarn dev
 ou
 npm run dev
 ```

 <img src="https://github.com/joneco02/00games_next/blob/main/public/systems.png?raw=true" width="900" alt="Systems" />
 <img src="https://github.com/joneco02/00games_next/blob/main/public/my_account_menu_logged.png?raw=true" width="900" alt="My Account" />

## Login
funcionando pereitamente local utilizando credentials ou google

<img src="https://github.com/joneco02/00games_next/blob/main/public/login_register.png?raw=true" width="900" alt="My Account" />


#### Login
<img src="https://github.com/joneco02/00games_next/blob/main/public/create_account.png?raw=true" width="900" alt="My Account" />

### Create Account
<img src="https://github.com/joneco02/00games_next/blob/main/public/login.png?raw=true" width="900" alt="My Account" />

## Área de Autorização

coloquei ao clicar na pagina de informacoes de qualquer jogo para só deixar se estiver logado, não era essa minha proposta inicial, mas serviu para adequar ao requerimento de autorização

<img src="https://github.com/joneco02/00games_next/blob/main/public/not_signed_in.png?raw=true" width="900" alt="My Account" />

## Base de Dados
```
Strapi:
mongodb://joneco:nrPzxekxjFVtLIye@167.114.98.177:27017/00games


Usuarios (prisma):

mongodb+srv://client:nrPzxekxjFVtLIye@joneco.ch8krgj.mongodb.net/00games
```

login do strapi passarei pelo teams
