# Stage 1 - build
FROM node:20.17.0-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to avoid unnecessary rebuilds
COPY package*.json ./

# Set build-time environment variables (these are usually injected by CI/CD pipelines)
ARG VITE_API_URL
ARG VITE_SITE_URL
ARG VITE_GOOGLE_SSO_CLIENT_ID
ARG VITE_FACEBOOK_SSO_CLIENT_ID
ARG VITE_PAYPAL_CLIENT_ID

# Write environment variables to .env file
RUN echo "VITE_API_URL=$VITE_API_URL" >> /app/.env && \
    echo "VITE_SITE_URL=$VITE_SITE_URL" >> /app/.env && \
    echo "VITE_GOOGLE_SSO_CLIENT_ID=$VITE_GOOGLE_SSO_CLIENT_ID" >> /app/.env && \
    echo "VITE_FACEBOOK_SSO_CLIENT_ID=$VITE_FACEBOOK_SSO_CLIENT_ID" >> /app/.env && \
    echo "VITE_PAYPAL_CLIENT_ID=$VITE_PAYPAL_CLIENT_ID" >> /app/.env

# Install dependencies using npm ci, ensuring that package-lock.json is respected
# If there are any sync issues, you should resolve them locally before building
RUN npm ci --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build


# Stage 2 - production
FROM node:20.17.0-alpine as final

# Set the working directory
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build-stage /app/.output ./.output
COPY --from=build-stage /app/.nuxt ./.nuxt
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.env ./.env
COPY package.json .
COPY nuxt.config.ts .

# Expose environment variables for Nuxt.js
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Nuxt server
CMD ["node", "-r", "dotenv/config", ".output/server/index.mjs"]
