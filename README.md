# rocketseat-gostack5-marketplace
API REST utilizando NodeJS, Express, Mongoose, Handlebars, Redis, Kue, Nodemailer e outras libs, além do uso de validadores, Sentry e autenticação com JWT.

# Desafio 3
Nesse terceiro desafio você irá melhorar a aplicação desenvolvida durante o terceiro módulo
com as seguintes funcionalidades:

- Armazene as intenções de compra (Purchase) no MongoDB criando um Model e salvando
os dados da purchase no método store do PurchaseController;
- Crie uma nova rota para o vendedor aceitar uma intenção de compra declarando o item
como vendido e a partir desse momento o anúncio não deve ser mais exibido nas
listagens e não deve ser mais possível realizar uma intenção de compra para esse anúncio;
- O Ad deve possui um campo adicional chamado purchasedBy que armazena o ID da
Purchase que o vendedor aceitou, caso esse campo esteja presente, quer dizer que o
anúncio foi vendido;

## Configurando
Para executar a aplicação, primeiro renomear **.env-sample** para **.env** e configurar DSN do Sentry e propriedades do mailer nas variáveis de ambiente. Aconselho MailTrap para testes. Além disso, é necessário um servidor de Redis, que também deve ser configurado nesse arquivo.

## Executando
Para executar a aplicação, usar:
```
yarn dev
```
***Ou***
```
npm run dev
```
