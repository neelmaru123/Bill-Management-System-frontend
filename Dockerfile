FROM node:14-alpine
WORKDIR /app
COPY  package*.json .
RUN npm install
COPY . .
EXPOSE 3500
CMD ["npm", "start"]