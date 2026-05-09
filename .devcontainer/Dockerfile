FROM node:20-bookworm

# Install system dependencies required by Playwright
RUN apt-get update && apt-get install -y \
    # System dependencies for Playwright
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libxss1 \
    libxtst6 \
    libnss3 \
    libnspr4 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libasound2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    # Additional useful tools
    git \
    curl \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Create a non-root user (node user already exists in node image)
USER node

# Expose port for dev server if needed
EXPOSE 3000
