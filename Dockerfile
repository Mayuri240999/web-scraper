# Stage 1 - Scraper
FROM node:18-slim AS scraper
WORKDIR /app

# Set environment variable BEFORE npm install to skip Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libxss1 \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN npm install

COPY scrape.js .
ENV SCRAPE_URL=https://example.com

# Run the scraper (outputs scraped_data.json)
RUN node scrape.js


# Stage 2 - Server
FROM python:3.10-slim
WORKDIR /app

COPY --from=scraper /app/scraped_data.json ./
COPY server.py ./
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "server.py"]
