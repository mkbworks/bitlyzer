# bitlyzer

<img src="https://58f2c229.citadelofcode.pages.dev/logos/bitlyzer.png" style="border-radius:50%" align="right" width="159px" alt="Bitlyzer logo">

This is my solution to the challenge available at [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-url-shortener) to create a URL shortener application. It has been developed using React and Node.js.

## Running the application

To successfully run the application, the following must already be installed in the system.

- Node.js
- Npm
- dotenvx (to process environment variables)

If all the above are available in the system, run the following command to start the application.

```bash
# The below command installs all the dependencies mentioned in the package.json file.
npm install

# This runs the script to start the web server.
npm start
```

To start a web server, a shell script `run.sh` should be executed. If the script is being executed for the first time, run the below command to make sure it is executable.

```bash
chmod +x ./run.sh
```