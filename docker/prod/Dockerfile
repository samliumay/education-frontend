# Stage 1 - build
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN  npm install

COPY . .

ARG VITE_API_URL
RUN echo "VITE_API_URL=$VITE_API_URL" > /app/.env

RUN npm run build


# Stage 2 - production
FROM node:18-alpine as final

WORKDIR /app

ADD package.json .

ADD nuxt.config.ts .

COPY --from=build-stage /app/.nuxt ./.nuxt
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/static ./static

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
