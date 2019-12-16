# 1.Install Mongodb #
- `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`

- `echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`


- `sudo apt-get update`

- `sudo apt-get install -y mongodb-org`
# 2.Create db #
- `mkdir -p /data/db`
# 3.In this derectory #
- `npm install`

- `node index`
# 4 In /client derectory #
- `npm install`

- `npm start`
