# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install app dependencies using yarn
RUN yarn install --production

# Copy the rest of the application files to the container
COPY . .

# Copy the .env file into the container
# COPY .env.local .env

# Expose the app on the desired port (e.g., 3000)
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]