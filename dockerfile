FROM node:19.2 as build 
WORKDIR /react-chaters
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-chaters/build /usr/share/nginx/html
