FROM node

WORKDIR /app/message

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8003

CMD ["npm","start"]