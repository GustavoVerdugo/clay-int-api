# NestJS API Project

## Description

This is a NestJS API for **Clay Technologies**, providing essential functionalities for managing products, users, and supporting internationalization. The API enables seamless interactions for creating, reading, updating, and deleting resources, as well as handling translations across multiple languages.

## Features

- **User Management**: Create, read, update, and delete user accounts.
- **Product Management**: Manage products with features for creating, reading, updating, and deleting product information.
- **Internationalization**: Support for translations across various languages to enhance user experience.
- **Authentication**: Secure endpoints to protect sensitive data and operations.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, offering static typing.
- **Prisma**: A modern database toolkit that simplifies database access with a type-safe query builder.
- **Zustand**: A small, fast state-management solution for React.
- **React Query**: A data-fetching library for React applications.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version >= 14.x)
- **npm** or **yarn**

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/clay-technologies-api.git
   cd clay-technologies-api```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```