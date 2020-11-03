FROM node:12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD ["npm", "start"]