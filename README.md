# PortFolio

Home page :
![portfolio home section](https://storry.fr/apps/files_sharing/publicpreview/erH7aqmCEDaRSXc?file=/&fileId=36767&x=1920&y=1080&a=true&etag=5f0ba2218e7f2cfa13ed3b571249f7bf)

## Setup

You want the same portfolio ?
Follow the steps below to install the project and start edditing your own.

```bash
# First, get in a cool directory on your computer

# Then, clone the repository
git clone https://github.com/valentinbgt/v.beauget.fr.git .

# Install the dependencies
npm install

# Start the development server
npm run dev
# The server will be available at http://localhost:3000
```

Congratulations ! You can now start edditing your own portfolio !

## Time for production

If you are happy with your portfolio, you can build it for production.

### Method A : Directly build the project

You can directly build the project with the following command :

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Follow the steps in the terminal and you will be ready to deploy it on a server.

This method is nice but this is not the one I use.

### Method B : My method to deploy the portfolio : Docker

If you have a server with Docker, I can recommend you to use the following method.

Create a Dockerfile :

```Dockerfile
# Start image
FROM node:latest AS builder

# Create and set working directory
WORKDIR /app

# Update package lists and install git
RUN apt-get update && apt-get install -y git


# Clone the repository
RUN git clone https://github.com/[username]/[your-portfolio-name]/ .

# Install dependencies and build
RUN npm install
RUN npm run build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/.output /app

# Expose default Nuxt port
EXPOSE 3000

# Start the server
CMD ["node", "/app/server/index.mjs"]

```

In the same directory as your Dockerfile, run the following command to build the image :

```bash
docker build -t [your-portfolio-name] .
```

Then, you can run the image :

```bash
docker run -d --restart always --name [your-portfolio-name] -v /var/www/[your-portfolio-name]/data:/web/server/data -p 3000:3000 [your-portfolio-name]:latest
```

I highly recommend you to use a reverse proxy to serve your portfolio.
