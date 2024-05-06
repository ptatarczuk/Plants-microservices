FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# najpierw dodaje package.json, żeby cashować przy kolejnym budowaniu obrazu