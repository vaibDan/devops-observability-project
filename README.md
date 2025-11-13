# Full-Stack Observability Project with Docker and the PLG Stack

This project demonstrates a complete, self-contained observability stack for a containerized Node.js application. It leverages the "PLG" (Prometheus, Loki, Grafana) stack to provide deep insights into application metrics and logs, all deployed on a single AWS EC2 instance using Docker Compose.

This project is designed to showcase skills in DevOps "Day 2" operations, including monitoring, logging, and system health analysis.

## Architecture

The entire stack runs within a Docker network on a single host.

```
+-------------------------------------------------------------+
|                     AWS EC2 Instance                        |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                Docker & Docker Compose                |  |
|  |                                                       |  |
|  |  +------------+   Scrapes   +------------+            |  |
|  |  | nodejs-app |<------------| Prometheus |-+          |  |
|  |  |  (Metrics) |             |  (Metrics) | |          |  |
|  |  +------------+             +------------+ |          |  |
|  |        |                                  | Queries  |  |
|  |        | (Logs via Docker Socket)         |          |  |
|  |        v                                  v          |  |
|  |  +------------+    Pushes   +------------+  +-------->|  |
|  |  |  Promtail  |------------>|    Loki    |  | Grafana |  |
|  |  |  (Agent)   |   (Logs)    |   (Logs)   |--+         |  |
|  |  +------------+             +------------+            |  |
|  |                                                       |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Technologies Used

*   **Application:** Node.js (Express)
*   **Containerization:** Docker, Docker Compose
*   **Metrics Collection:** Prometheus
*   **Log Aggregation:** Loki & Promtail
*   **Visualization:** Grafana
*   **Cloud Provider:** AWS (EC2)

## Key Features

*   **Metrics:** The Node.js application is instrumented with `prom-client` to expose custom application metrics (e.g., `http_requests_total`).
*   **Structured Logging:** The application produces JSON-formatted logs for easy parsing and querying in Loki.
*   **Log Discovery:** Promtail uses the Docker socket to automatically discover and collect logs from all running containers.
*   **Centralized Visualization:** Grafana provides a single pane of glass for viewing both Prometheus metrics and Loki logs on the same dashboard.
*   **IaC (Container Level):** The entire multi-service application is defined declaratively in a single `docker-compose.yml` file for easy, repeatable deployments.

## How to Run

### Prerequisites

*   Docker and Docker Compose installed.
*   An AWS account to provision an EC2 instance.
*   Git.

### Deployment Steps

1.  **Launch an AWS EC2 Instance:**
    *   Use an Ubuntu 22.04 LTS AMI (e.g., `t2.micro`).
    *   Configure the Security Group to allow inbound traffic on:
        *   **Port 22** (SSH from your IP)
        *   **Port 3000** (for the Node.js App from Anywhere)
        *   **Port 3001** (for Grafana from Anywhere)

2.  **Install Dependencies on EC2:**
    *   SSH into your instance.
    *   Install Docker and Docker Compose using the official documentation.

3.  **Deploy the Stack:**
    *   Clone this repository: `git clone https://github.com/vaibDan/devops-observability-project.git`
    *   Navigate into the directory: `cd devops-observability-project`
    *   Launch the services: `docker-compose up -d`

## Accessing the Services

*   **Node.js Application:** `http://<YOUR_EC2_IP>:3000`
*   **Prometheus UI:** `http://<YOUR_EC2_IP>:9090`
*   **Grafana UI:** `http://<YOUR_EC2_IP>:3001` (Login: `admin` / `admin`)

## Grafana Setup

After logging into Grafana for the first time:

1.  **Add Prometheus Data Source:**
    *   URL: `http://prometheus:9090`
2.  **Add Loki Data Source:**
    *   URL: `http://loki:3100`
3.  Build a dashboard to visualize metrics (e.g., `http_requests_total`) and logs (e.g., `{container="nodejs-app"}`).

## Example Dashboard

*(Placeholder for your screenshot: Once your Grafana dashboard is built, take a screenshot and add it here!)*

![Grafana Dashboard Screenshot](placeholder.png)