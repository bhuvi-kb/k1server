FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

RUN chmod -R 777 ./profile_images

CMD [ "npm", "start" ]


