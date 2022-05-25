FROM nginx:latest
ADD ./dist/ /data/nginx/html/
