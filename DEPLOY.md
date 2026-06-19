# Deploy na Railway — Jorge Ferreira Movers

## Ordem de Deploy

1. Aceder a railway.app e criar um novo projecto vazio.

2. Adicionar servico PostgreSQL:
   - New Service -> Database -> PostgreSQL
   - Guardar as variaveis DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

3. Adicionar servico Backend:
   - New Service -> GitHub Repo -> seleccionar o repositorio
   - Root Directory: backend
   - Adicionar todas as variaveis de ambiente do .env.example
   - OBRIGATORIO antes do primeiro deploy:
     Criar Volume com mount path /app/uploads

4. Apos o backend fazer deploy com sucesso:
   - Verificar GET https://[url-backend]/api/health retorna 200
   - Chamar POST https://[url-backend]/api/auth/setup (cria o admin)
   - Chamar POST https://[url-backend]/api/settings/run-seeds com token JWT

5. Adicionar servico Site:
   - New Service -> GitHub Repo -> Root Directory: site
   - Variaveis: NEXT_PUBLIC_ADMIN_API_BASE=https://[url-backend]
   - No backend, definir SITE_PUBLIC_URL=https://[url-site] antes de importar
     as imagens do cliente.

6. Adicionar servico Admin Panel:
   - New Service -> GitHub Repo -> Root Directory: frontend
   - Variaveis: VITE_API_URL=https://[url-backend]
                VITE_SITE_URL=https://[url-site]

7. Actualizar CORS_ORIGIN no backend com as URLs definitivas do site e admin.

8. (Opcional) Configurar dominios personalizados em cada servico.

## Variaveis Criticas

- Nunca commitar .env
- Criar o Volume antes do primeiro deploy do backend
- Nunca guardar localhost no banco de dados
- Apos qualquer re-seed, correr fix-media-urls
