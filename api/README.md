# Bitlyzer - API

To successfully launch the Bitlyzer API, the following softwares must be installed in the system.

- Node.js
- Npm (Node package manager to manage external dependencies for the project)
- dotenvx (npm package to be installed globally to manage environment variables for the project)

Once the aforementioned softwares are available, run the following command to start the application.

```bash
# The below command installs all the dependencies mentioned in the package.json file.
npm install

# This uses dotenvx to load the environment variables and starts the web server instance that exposes the Bitlyzer API endpoints.
npm start
```