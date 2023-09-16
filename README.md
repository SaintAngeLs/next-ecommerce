### ------------------------
Generate jwt public and private keys

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
```
# NEST.js ecommerce store 

To run the project run the:

```bash 
yarn install
```

and than 

```bash
yarn dev
```
