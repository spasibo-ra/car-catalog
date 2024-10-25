FROM node:18

WORKDIR /car-catalog

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
