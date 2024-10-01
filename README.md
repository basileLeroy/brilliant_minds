# SETUP

for the frontend, nothing much to set up.

For the backend, you need to create a `.env` file with the following fields:

```
PORT=3070
HOST=localhost

# CLIENT_BASE_URL=

DB_PORT=3306
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=brilliant_minds
```

> Note: You will have to create a **Database** first called "brilliant_minds" with a **table** called "ideas" (title, description)