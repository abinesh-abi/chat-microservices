FROM node

WORKDIR /app/chat

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8003

CMD ["npm","start"]