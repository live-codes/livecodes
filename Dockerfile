FROM node:24.1.0-alpine3.21 AS build-stage
RUN apk update && apk add git

# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY . .
# Install the project dependencies
RUN npm install
# Build the application to the production mode to dist folder
RUN npm run build


# Use a lightweight web server to serve the built application
FROM httpd:2.4 AS production-stage
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/build /usr/local/apache2/htdocs/
CMD ["httpd-foreground"]