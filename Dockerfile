FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "yarn", "run","dev" ]
