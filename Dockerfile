FROM node:18

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["node","dist/main"]

CMD [ "npm","run","start:prod" ]