# Running the Project via Docker

To run the project using Docker, follow these steps:

1. **Install Docker**: Ensure Docker is installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

2. **Clone the Repository**:

```sh
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

3. **Build the Docker Image**:

```sh
docker build -t news-aggregator:latest .
```

4. **Run the Docker Container**:

```sh
docker run -d -p 3000:3000 news-aggregator:latest
```

5. **Access the Application**: Open your web browser and navigate to `http://localhost:3000`.

6. **Stopping the Container**:

```sh
docker ps
docker stop <container_id>
```

Replace `<container_id>` with the actual container ID from the `docker ps` command output.

That's it! the project should now be running in a Docker container.
