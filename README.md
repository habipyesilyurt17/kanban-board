## About The Project

In this Project, more than one Board List can be created and each list has 4 static lists in itself. These are Backlog, To Do, in Progress and Done. Cards belonging to each static list can be created, colored and updated differently. Cards should be able to be moved between lists by drag and drop method. But this stage is not yet completed.

### Built With

- [React.js](https://reactjs.org/)
- [GraphQl](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)


## Getting Started

To get this project copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   ```sh
   git@github.com:habipyesilyurt17/kanban-board.git
   ```
2. Install packages
    - For Client Side, you must switch to the frontend directory of the project. Then you have to install the packages.
      ```sh
        cd frontend
        npm install
        # or
        yarn install
      ```
    - For Server Side, you must switch to the own directory of the project. Then you have to install the packages.
        ```sh
        npm install
        # or
        yarn install
      ```
3. Let's raise both the server and the client from two different terminal screens.
      - Run the server
      ```bash
      npm start
      # or
      yarn start
      ```

    - Run the client
    ```bash
      cd frontend
      npm start
      # or
      yarn start
    ```
4. You can test GraphQL queries from the grapiql panel.
    ```sh
    http://localhost:8000/graphql
    ```
