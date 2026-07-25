# Asynchronous PDF Generator Worker (Consumer)

A high-performance, scalable background worker built with **TypeScript** that focuses exclusively on consuming messages from **RabbitMQ** to generate PDF documents. It utilizes **Puppeteer** for pixel-perfect HTML/URL-to-PDF rendering, allowing you to offload heavy document generation tasks from your main API.

## 🚀 Features

* **Dedicated Consumer**: Optimized strictly to pull tasks from RabbitMQ and process them efficiently without blocking your main API services.
* **Pixel-Perfect Rendering**: Powered by Puppeteer (Headless Chromium) for precise HTML/CSS-to-PDF conversion.
* **TypeScript Native**: Full type safety, cleaner worker architecture, and modern ESNext features.
* **Scalable Workers**: Easily scale the number of consumer instances horizontally to handle heavy peak traffic.

## 🛠️ Tech Stack

* **Language**: [TypeScript](https://typescriptlang.org)
* **Runtime**: [Node.js](https://nodejs.org)
* **Package Manager**: [Yarn](https://yarnpkg.com)
* **Rendering Engine**: [Puppeteer](https://pptr.dev)
* **Message Broker**: [RabbitMQ](https://rabbitmq.com)
* **Infrastructure**: [Docker](https://docker.com)

## 📋 Architecture Flow

1. An external application (Producer) publishes a payload containing HTML content or a URL into the **RabbitMQ** queue.
2. This **PDF Generator Worker (Consumer)** continuously listens to the specified queue.
3. The worker fetches the message, triggers **Puppeteer** to launch a headless browser, and renders the HTML.
4. The generated PDF is outputted according to your business logic (e.g., uploaded to cloud storage like AWS S3, saved locally, or sent to another service).
5. The worker sends an acknowledgment (`ack`) back to RabbitMQ upon successful creation.

## 🔧 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) (v18+ recommended)
* [Yarn](https://yarnpkg.com) package manager
* [Docker Desktop](https://docker.comproducts/docker-desktop/)

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd pdf-generator
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```bash
   PORT=3102
   TIMEOUT=300000
   AMQP_URL=amqp://
   QUEUE_REPORT_NAME=
   TOKEN=token_to_access_web
   BASE_URL=
   WEB_URL=
   TOTAL_PREFETCH=1
   ```

### 🚀 Running Locally

1. **Start RabbitMQ Broker**
   Launch the RabbitMQ instance in the background using Docker Compose:
   ```bash
   docker compose up -d
   ```
   *You can access the RabbitMQ Management Dashboard at http://localhost:15672 (User: `guest`, Pass: `guest`).*

2. **Start the Consumer Worker in Development Mode**
   Run the application with live-reload enabled:
   ```bash
   yarn start:dev
   ```
