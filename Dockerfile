FROM node:16

ENV REACT_APP_API_URL=http://localhost:3000

WORKDIR /fe

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn global add serve
RUN yarn build

CMD ["serve", "-s", "build", "-l", "3001"]
EXPOSE 3001
