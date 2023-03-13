FROM node:16
WORKDIR /home/container
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "./dist"]