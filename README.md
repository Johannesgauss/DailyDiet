# Daily Diet API
Esta API foi feita usando NestJS seguindo os padrões da Clean Architecture e Domain-Driven Design (DDD).

O Sistema permite o cadastramento de usuários via email e senha utilizando o Passsport local, devolvendo um token JWT no processo. Após isso, é necessário enviar o token JWT para todas as rotas não @Public.

As refeições são associadas a cada usuário. Além disso, a API fornece estatísticas sobre o progresso dele.

A divisão no código ficou em /src/infra para coisas como Banco de Dados e as regras de negócio ficaram em /src/modules.

## Como executar o projeto
É necessário configurar o .env para ativar um banco de dados. Recomenda-se o PostgreSQL na porta 5432.

## Rotas da API

### Públicas
* 'POST /users' - cria um usuário
* 'POST /signIn' - autentica um usuário, retornando o token JWT
### Protegidas
* 'POST /meals' - cadastra uma refeição
* 'PUT/DELETE/GET /meals/:id' - atualiza todos os dados da refeição, remove-a ou obtém seus detalhes
* 'GET /meals' - lista todas as refeições do usuário logado
* 'GET /meals/metrics' - Retorna as estatísticas e o streak da dieta do usuário
