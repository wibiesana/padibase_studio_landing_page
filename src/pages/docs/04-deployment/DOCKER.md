# 🐳 Docker Deployment Guide — PadiBase Studio

Deploying **PadiBase Studio** with Docker uses the pre-built single binary, resulting in an ultra-compact (~30MB) container image that boots instantly without requiring Rust or build tools inside the container.

---

## 📄 Dockerfile

```dockerfile
FROM debian:bullseye-slim

# Install root SSL certificates and timezone data:
RUN apt-get update && apt-get install -y ca-certificates tzdata && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the pre-built padibase binary:
COPY padibase /app/padibase
RUN chmod +x /app/padibase

# Expose PadiBase Studio HTTP port:
EXPOSE 8085

# Persistent volume for SQLite database and file storage:
VOLUME ["/app/padi_data"]

# Run the server:
CMD ["./padibase", "serve", "--http", "0.0.0.0:8085", "--dir", "/app/padi_data"]
```

---

## 🚀 Building & Running the Container

```bash
# 1. Build the lightweight image:
docker build -t padibase-app .

# 2. Run container with persistent data volume:
docker run -d \
  --name padibase \
  -p 8085:8085 \
  -v padibase_data:/app/padi_data \
  --restart unless-stopped \
  padibase-app
```

The PadiBase Studio Dashboard is immediately accessible at:
👉 **`http://localhost:8085/_padibase/`**
