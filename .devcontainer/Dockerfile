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

# Use the existing Playwright image user from the base image
USER pwuser

# Expose port for dev server if needed
EXPOSE 3000
