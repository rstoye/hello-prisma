# How to do this

### Download and initialize repository

```bash
git clone https://github.com/rstoye/hello-prisma.git
cd hello-prisma
npm install
```

### set up database

Either use your own SQL server instance and configure it through the `.env` file or run the following steps to quickly set up a server with docker.

```bash
docker run -e "ACCEPT_EULA=Y" \
    -e "MSSQL_SA_PASSWORD=password1!" \
    -e "MSSQL_PID=Evaluation" \
    -p 1433:1433 \
    --name sqlpreview \
    --hostname sqlpreview \
    -d \
    mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04
```

If you did it like that the provided `.env` file should be good to go.

Now initalize the database with prisma migrate.

```bash
npx prisma migrate dev --name init
```

### run the code

```bash
npx ts-node script.ts
```
