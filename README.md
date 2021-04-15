# NodeJS-Interview

Aplicação criada para simular cadastro de cidades e clientes.

Foi criado um workflow no github para que a cada push no projeto um job execute os testes e confirme que o projeto não sofreu erros após as alterações de código.

`https://github.com/jonathapriebe/NodeJS-Interview/actions`

Obs: Os arquivos de configuração de acesso a banco devem ficar no arquivo .env na raiz do projeto, um arquivo de exemplo está na raiz do projeto também com o nome .env.sample.

Tecnologias utilizadas:

- NodeJs
- Typescript
- MongoDB
- Jest
- Swagger UI Express
- ESLint

## Documentação:

A documentação da aplicação encontra-se na rota `/docs`.

## Para rodar a aplicação:

Configurar o .env, a aplicação foi construída para utilizar o MongoDB, portanto necessária a configuração do .env para rodar a aplicação bem como seus testes. Para rodar a aplicação rodar o comando:

```sh
$ yarn start
```

### Para rodar a aplicação em modo de desenvolvimento:

Para rodar a aplicação em modo de desnvolvimento, onde a aplicação é reiniciada a cada alteração no projeto, rodar o comando:

```sh
$ yarn start:dev
```

### Para rodar os testes:

Para rodar os testes é necessário que o .env esteja configurado e uma instância do MongoDB esteja rodando, após isso rodar o comando:

```sh
$ yarn test
```

### Para executar somente o build do projeto:

```sh
$ yarn build
```

### Para executar verificação de código:

```sh
$ yarn lint
```

### Para executar verificação de código e corrigir problemas (quando possível):

```sh
$ yarn lint:fix
```

### Para validação de estilo de código com prettier:

```sh
$ yarn style:check
```

### Para validação de estilo de código com prettier e corrigir problemas:

```sh
$ yarn style:fix
```
