#!/bin/bash

# Below command checks if node is installed in the system.
# Routing outputs and errors to /dev/null ensures they are supressed and 
# not printed on stdout or stderr.
if command -v node > /dev/null; then
    echo "Node.js is installed in the system."
    echo "The current version of Node.js running in the system is:"
    node -v
    if npm list -g @dotenvx/dotenvx > /dev/null; then
        echo "Starting the Bitlyzer application now..."
        dotenvx run -f .env.local -- node server/server.js
    else
        echo "@dotenvx/dotenvx should be installed globally in the system to run the go.coc application."
    fi
else
    echo "Node.js is not installed in the system."
    echo "Please install it before executing the application again."
fi