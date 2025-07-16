FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY index.js .
EXPOSE 52001
CMD ["node", "index.js"]
