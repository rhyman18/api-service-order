# API Service Order

This repository provides a service for managing orders through an API. The API is documented with Swagger and uses Sequelize for database interaction.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [ERD Database](#erd-database)

## Tech Stack

**Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication, and more.

**MySQL2**: A MySQL client for Node.js with a focus on performance. It supports both callbacks and promises.

**Swagger**: A set of open-source tools built around the OpenAPI Specification that helps design, build, document, and consume RESTful web services. This project uses `swagger-jsdoc` for generating API documentation and `swagger-ui-express` for serving the documentation.

**jsonwebtoken**: A library to work with JSON Web Tokens (JWT), which are commonly used for secure data transmission and user authentication.

**dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`, allowing you to separate your secrets and configuration from your code.

**bcryptjs**: A library to hash passwords and compare hashed passwords, enhancing the security of user authentication.

**ioredis**: A powerful Redis client for Node.js, supporting cluster and sentinel modes, suitable for advanced Redis features.

## Installation

**Clone the Repository**

```sh
git clone https://github.com/rhyman18/api-service-order.git
cd api-service-order
```

**Install Dependencies**

Ensure you have Node.js installed. Then, install the necessary dependencies:

```sh
npm i
```

## Database Setup

**Import Database Schema**

If you already have MySQL and phpMyAdmin installed, import the database schema from `data.sql` using your preferred tool (e.g., MySQL Workbench or the MySQL command line):

```sh
mysql -u your_username -p your_database < data.sql
```

If you do not have MySQL, Redis and phpMyAdmin installed, you can use Docker to set up MySQL, Redis, and phpMyAdmin. Ensure Docker is installed on your system, then run:

```sh
docker compose up -d
```

This will start MySQL, Redis, and phpMyAdmin services as defined in the `docker-compose.yml` file. You can then access phpMyAdmin at `http://localhost:8080` to import the `data.sql` file.

**Configure Database Connection**

Make sure to configure your database & redis connection settings in the `docker-compose.yml` file or the environment variables to match the Docker container setup or your local MySQL & Redis configuration.

## Environment Variables

Edit a `.env` file in the root of your project and edit of the following configuration based on your setting, example:

```sh
HOST=http://localhost
PORT=9000

DB_DRIVER=mysql
DB_HOST=localhost
DB_NAME=data
DB_USERNAME=root
DB_PASSWORD=12345678

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_EXPIRE=3600
```

## Running the Application

To start the application, use the following command:

```sh
npm run start
```

This will start the API server, and it should be accessible at `http://localhost:9000` (or the port you have configured).

## API Documentation

The API documentation is available via Swagger. After starting the application, you can view the documentation by navigating to:

```sh
http://localhost:9000/api/docs
```

Here you can see detailed information about the available API endpoints and how to use them.

## ERD Database

The Entity-Relationship Diagram (ERD) provides a visual representation of the database structure and relationships between entities. Below is the ERD for the database used in this project:

<img align="center" src="api-service-order.webp" />
