# F1DataLab - A Formula 1 Data Visualization Site

_This project is under active development. Future features will include a driver-to-driver comparison tool to analyze lap times, race positions, and other key performance metrics._

_The current dataset is historical and does not contain the latest racing data. Future updates will incorporate more recent results._

[![App Tech](https://skillicons.dev/icons?i=py,fastapi,next,ts,mysql,docker,)](https://skillicons.dev)

### **Live Site:** [**formula1datalab.com**](https://formula1datalab.com/)

F1DataLab is a full-stack web application built to showcase modern development practices and provides a platform to explore and visualize historical racing data.

## Key Features

The application provides an interactive experience for exploring Formula 1 data through a variety of charts and tables:

*   **Race Results:** Explore data from individual races, including finishing positions, and other key race events visualized in clear, informative charts.
*   **Driver Analytics:** Analyze driver performance, career milestones, and year-over-year results with intuitive graphs.
*   **Constructor Insights:** View detailed statistics and performance data for F1 constructors across different seasons.

## Containerization & Deployment

The entire application is containerized using Docker, ensuring consistency across development and production environments.

*   **Container Orchestration:** Docker Compose is used to define and manage the multi-container application stack (frontend, backend, database, and reverse proxy).

*   **Efficient Production Builds:** The production environment utilizes a multi-stage Docker build strategy.
    1.  The Next.js frontend is built once into a lean, production-ready image.
    2.  The Nginx image is then created by copying only the necessary static assets (`.next/static` and `public`) from the pre-built frontend image. This results in a small, secure, and highly efficient Nginx container that serves the static content.

*   **Reverse Proxy & SSL:**
    *   [**Nginx**](https://www.nginx.com/) serves as the reverse proxy, directing traffic to the appropriate frontend or backend service.
    *   [**Let's Encrypt**](https://letsencrypt.org/) is used to automatically provision and manage SSL certificates, ensuring all traffic is served over HTTPS.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.