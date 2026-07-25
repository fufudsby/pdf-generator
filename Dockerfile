FROM ghcr.io/puppeteer/puppeteer:latest as base

# Add package file
COPY package.json ./

# Install deps
RUN npx puppeteer browsers install chrome
RUN npm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN npm run build

# Start production image build
FROM ghcr.io/puppeteer/puppeteer:latest

# Copy node modules and build directory
COPY --from=base /home/pptruser/node_modules /home/pptruser/node_modules
COPY --from=base /home/pptruser/build /home/pptruser/build

# Expose port
EXPOSE 3102
CMD ["build/index.js"]