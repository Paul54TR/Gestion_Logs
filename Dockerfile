FROM node

WORKDIR /gestion-logs-integracion

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node","index.js"]