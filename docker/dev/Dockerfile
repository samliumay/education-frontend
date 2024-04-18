# Stage 1 - build
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN  npm install

COPY . .

ARG VITE_API_URL
ARG VITE_SITE_URL
ARG VITE_GOOGLE_SSO_CLIENT_ID
ARG VITE_FACEBOOK_SSO_CLIENT_ID
ARG VITE_PAYPAL_CLIENT_ID

RUN echo "VITE_API_URL=$VITE_API_URL" >> /app/.env
RUN echo "VITE_SITE_URL=$VITE_SITE_URL" >> /app/.env
RUN echo "VITE_GOOGLE_SSO_CLIENT_ID=$VITE_GOOGLE_SSO_CLIENT_ID" >> /app/.env
RUN echo "VITE_FACEBOOK_SSO_CLIENT_ID=$VITE_FACEBOOK_SSO_CLIENT_ID" >> /app/.env
RUN echo "VITE_PAYPAL_CLIENT_ID=$VITE_PAYPAL_CLIENT_ID" >> /app/.env

RUN npm run build
RUN npm test


# Stage 2 - production
FROM node:18-alpine as final

WORKDIR /app

ADD package.json .

ADD nuxt.config.ts .

COPY --from=build-stage /app/.output ./.output
COPY --from=build-stage /app/.nuxt ./.nuxt
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.env ./.env

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", ".output/server/index.mjs"]
