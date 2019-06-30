FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
WORKDIR /usr/share/nginx/html
COPY dist/nomad-fe .