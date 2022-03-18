# For local development
FROM node:16.13.2-buster as local
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 3000
CMD [ "npm","run","start" ]

FROM node:16.13.2-buster as build
WORKDIR /app
COPY . .
CMD npm ci
RUN npm run package

# For production image - NGINX Web Server
FROM nginx:1.21.6-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]