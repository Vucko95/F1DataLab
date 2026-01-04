# F1DataLab - A Formula 1 Data Visualization Site


_The current dataset is historical and does not contain the latest racing data. Future updates will incorporate more recent results._

[![App Tech](https://skillicons.dev/icons?i=py,fastapi,next,ts,mysql,docker)](https://skillicons.dev)

### **Live Site:** [**formula1datalab.com**](https://formula1datalab.com/)

F1DataLab is a full-stack web application built to showcase modern development practices and provides a platform to explore and visualize historical racing data.

## Key Features

The application provides an interactive experience for exploring Formula 1 data through a variety of charts and tables:

*   **Race Results:** Explore data from individual races, including finishing positions, and other key race events visualized in clear, informative charts.
*   **Driver Analytics:** Analyze driver performance, career milestones, and year-over-year results with intuitive graphs.
*   **Constructor Insights:** View detailed statistics and performance data for F1 constructors across different seasons.

## Technology Stack

*   **Frontend:** Next.js 14 with TypeScript, Tailwind CSS, and Recharts for data visualization
*   **Backend:** Fastapi REST API with SQLAlchemy ORM
*   **Database:** MySQL for structured F1 racing data

## Containerization & Deployment

The entire application is containerized using Docker, ensuring consistency across development and production environments.

*   **Container Orchestration:** Docker Compose is used to define and manage the multi-container application stack (frontend, backend, and database).

*   **Efficient Production Builds:** The production environment utilizes multi-stage Docker builds to create optimized, production-ready images for both the Next.js frontend and Flask backend.

*   **Reverse Proxy & SSL:**
    *   [**Traefik**](https://traefik.io/) serves as the modern cloud-native reverse proxy with automatic service discovery via Docker labels.
    *   [**Let's Encrypt**](https://letsencrypt.org/) integration provides automatic SSL certificate provisioning and renewal, ensuring all traffic is served over HTTPS.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.