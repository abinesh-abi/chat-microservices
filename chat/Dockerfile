FROM node

WORKDIR /app/chat

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8002

CMD ["npm","start"]