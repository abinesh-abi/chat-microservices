FROM node

WORKDIR /app/webSocket

COPY package.json .

RUN npm i

COPY . .

EXPOSE 9000

CMD ["npm","start"]