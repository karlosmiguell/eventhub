# EventHub — aplicação pronta para o laboratório Docker Compose

Arquitetura com **frontend Nginx**, **backend Java/Spring Boot REST** e **MySQL**.

## Objetivo didático
O código está pronto. O aluno deverá criar **dois Dockerfiles** e um **docker-compose.yml com 3 serviços**: `frontend`, `backend` e `database`.

## Fluxo esperado

```text
Navegador -> frontend (Nginx) -> backend (Spring Boot) -> database (MySQL)
```

O arquivo `frontend/nginx.conf` já contém o proxy:

```nginx
proxy_pass http://backend:8080/api/;
```

Isso significa que, no Compose, deverá existir um serviço chamado `backend` ou o aluno deverá adaptar essa configuração.

## Estrutura
- `frontend/`: HTML/CSS/JavaScript + configuração Nginx
- `backend/`: Spring Boot + JPA
- Banco: MySQL 8+ usando imagem oficial

## Backend
Porta interna esperada: `8080`

Variáveis:
- `APP_PORT=8080`
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_NAME=eventhub`
- `DB_USER=root`
- `DB_PASSWORD=root`

Endpoints:
- `GET /api/eventos`
- `POST /api/eventos`
- `DELETE /api/eventos/{id}`
- `GET /api/eventos/health`

## Frontend
O frontend chama `/api/eventos`. O Nginx encaminha essa requisição para `backend:8080` dentro da rede Docker.

O aluno deverá descobrir como criar um Dockerfile baseado em Nginx que copie:
- `index.html`
- `app.js`
- `nginx.conf`

## Missão do aluno
1. Criar `frontend/Dockerfile`.
2. Criar `backend/Dockerfile`.
3. Criar `docker-compose.yml` com `frontend`, `backend` e `database`.
4. Configurar o backend para usar o serviço do banco em `DB_HOST`.
5. Criar volume para persistência do MySQL.
6. Configurar dependências entre os serviços quando necessário.
7. Mapear a porta do frontend para o navegador.
8. Validar com `docker compose ps` e `docker compose logs`.

> Não há Dockerfiles nem Compose no projeto de propósito.
