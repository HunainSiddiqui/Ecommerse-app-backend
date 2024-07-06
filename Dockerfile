FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN cd ./baackend 

EXPOSE 3000

CMD ["npm", "start"]