#  Web Scraper & JSON API using Puppeteer and Flask                                                                                                                                                                  This project scrapes metadata (title, heading, and description) from a specified URL using Puppeteer (Node.js) and serves the extracted data as JSON through a Flask (Python) web server. Everything is containerized using a multi-stage Docker build for efficiency and modularity.

#Project Structure
.
├── Dockerfile
├── scrape.js
├── server.py
├── package.json
├── requirements.txt
└── README.md

#How to Build the Docker Image
Make sure Docker is installed and running on your system

```
docker build -t web-scraper:v1 .
```

#How to Run the Container
You must pass the URL to scrape via the SCRAPE_URL environment variable

```
docker run -p 5000:5000 -e SCRAPE_URL=https://example.com web-scraper:v1
```

#How to Access the Hosted Scraped Data

http://localhost:5000/

You will see a JSON response like:

{
  "data": (
    "description": "This is a sample page straped with Puppeteer.",
    "heading": "Example Domain",
    "title": "Example Domain"
  }
}

#Multi-Stage Dockerfile

The Dockerfile uses multi-stage builds:

Node stage: Installs Puppeteer and scrapes the target page.

Python stage: Installs Flask and runs the web server.

Only the scraped_data.json and necessary server code are copied to the final image.
