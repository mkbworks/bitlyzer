## API Endpoints

To successfully launch the `Endpoints` project, the following softwares must be installed in the system.

- Node.js
- Npm (Node package manager to manage external dependencies for the project)
- dotenvx (npm package to be installed globally to manage environment variables for the project)

Once installed, open a terminal and navigate to the root folder of the project and run the below command(s).

```bash
# This command installs all the project specific dependencies.
npm install

# This loads the test environment variables to the server instance created and launched.
npm run dev
```

### Environment variables

The following environment variables are required to run the API service.

- `HOST` - Hostname for the API service (here it will be `localhost`).
- `PORT` - Port number where the API service will be listening for incoming requests.
- `MONGO_USER` - Username to connect to MongoDb instance.
- `MONGO_PWD` - Password for the above username.
- `MONGO_CLUSTER` - Cluster name where the MongoDb instance is hosted.
- `MONGO_HOST` - Hostname of the server where the database instance is hosted.
- `MONGO_PROTO` - Protocol to be used to establish connection to the MongoDb instance.
- `MONGO_DB` - name of the database instance.

### Setting up API endpoints locally

To setup locally, create a file in the root directory and name it `.env.local` and make sure it contains values for the above mentioned environment variables.
