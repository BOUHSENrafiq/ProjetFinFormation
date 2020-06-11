#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build app
#stage 2
FROM nginx:apline
COPY --from=node /app/dist/ProjetFinFormation usr/share/nginx/html
