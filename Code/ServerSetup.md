# Server setup

In order to properly setup the server to be used in testing, the following must be done:

Ensure docker is installed.

Navigate to the server folder, this has the file **docker-compose.yml**

run the following commands in your terminal:

```shell
docker compose up -d
```

```shell
docker exec -it mysql-intercal bash
```

```console
mysql -u root -p
```
you will then enter the password for the root user ("rootpw" by default),

then press enter.

run the final commands:
```console
use maindb
```

```console
source docker-entrypoint.initdb.d/init.sql
```

## .env file

The final step in setting up the database is to setup the .env file. This file is not tracked by git, as it usually contains private information. 

In the server folder, create a file named ```.env```. Inside the file insert the following code:

```txt
DB_HOST=localhost
DB_PORT=3306
DB_NAME=maindb
DB_USER=root
DB_PASSWORD=rootpw
```

If everything worked, your local database should haave all the neccesary tables and entries.

#### You can close your server either from docker or from your terminal:
```
docker compose down
```
