FROM node:alpine AS build
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx AS final
COPY ./.deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
