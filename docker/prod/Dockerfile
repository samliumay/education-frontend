FROM node:20.17.0-alpine as build-stage
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install dependencies needed for build
COPY package*.json ./

ARG VITE_API_URL
ARG VITE_SITE_URL
ARG VITE_GOOGLE_SSO_CLIENT_ID
ARG VITE_FACEBOOK_SSO_CLIENT_ID
ARG VITE_PAYPAL_CLIENT_ID

RUN echo "VITE_API_URL=$VITE_API_URL" >> /usr/src/.env
RUN echo "VITE_SITE_URL=$VITE_SITE_URL" >> /usr/src/.env
RUN echo "VITE_GOOGLE_SSO_CLIENT_ID=$VITE_GOOGLE_SSO_CLIENT_ID" >> /usr/src/.env
RUN echo "VITE_FACEBOOK_SSO_CLIENT_ID=$VITE_FACEBOOK_SSO_CLIENT_ID" >> /usr/src/.env
RUN echo "VITE_PAYPAL_CLIENT_ID=$VITE_PAYPAL_CLIENT_ID" >> /usr/src/.env

RUN npm ci --frozen-lockfile

COPY . .

# build necessary, even if no static files are needed,
# since it builds the server as well
# RUN npm run generate --fail-on-page-error
RUN npm run build

# Use NGINX to serve the built app
# FROM nginx:1.23.3-alpine

# WORKDIR /usr/src

# RUN rm -rf /etc/nginx/conf.d
# COPY docker/prod/nginx.conf /etc/nginx/nginx.conf
# COPY public/* /usr/src/public/

# # Copy build dist files to NGINX image
# COPY --from=0 /usr/src/.output/public /usr/src

FROM node:20.17.0-alpine

WORKDIR /usr/src

ADD package.json .

ADD nuxt.config.ts .

COPY --from=build-stage /usr/src/.output ./.output
COPY --from=build-stage /usr/src/.nuxt ./.nuxt
COPY --from=build-stage /usr/src/node_modules ./node_modules
COPY --from=build-stage /usr/src/.env ./.env

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", ".output/server/index.mjs"]
