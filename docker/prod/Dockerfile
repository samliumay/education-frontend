FROM node:16-alpine as build-stage
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install dependencies needed for build
COPY package*.json ./

RUN npm install

ARG VITE_API_URL
ARG VITE_PAYPAL_CLIENT_ID

COPY . /usr/src

RUN echo "VITE_API_URL=$VITE_API_URL" > /usr/src/.env
RUN echo "VITE_PAYPAL_CLIENT_ID=$VITE_PAYPAL_CLIENT_ID" > /usr/src/.env

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run generate

# Use NGINX to serve the built app
FROM nginx:1.23.3-alpine

WORKDIR /usr/src

RUN rm -rf /etc/nginx/conf.d
COPY docker/prod/nginx.conf /etc/nginx/nginx.conf
COPY public/* /usr/src/public/

# Copy build dist files to NGINX image
COPY --from=0 /usr/src/.output/public /usr/src
