FROM mcr.microsoft.com/playwright:v1.59.1-noble
# Install additional useful tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Use the existing node user from the base image
USER node

# Expose port for dev server if needed
EXPOSE 3000
