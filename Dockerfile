# Base image with Node.js and Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.49.1-noble

# Set working directory inside the container to match your project structure
WORKDIR /app

# Copy the entire project folder into the container
COPY . /app

# Install dependencies
# RUN npm install

# Install Java & other dependencies and set JAVA_HOME (if required for your tests)
RUN apt-get update && apt-get install -y default-jdk && \
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 && \
    export PATH=$JAVA_HOME/bin:$PATH && \
    npm install

# Set environment variables for Java (persistent across container runs)
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Expose any required ports (optional)
# EXPOSE 3000

# Default command to execute when the container starts
CMD ["npm", "playwright", "test"]
