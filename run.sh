#!/bin/bash

# Below command checks if node is installed in the system.
# Routing outputs and errors to /dev/null ensures they are supressed and 
# not printed on stdout or stderr.
if command -v node > /dev/null; then
    echo "Node.js is installed in the system."
    echo "The current version of Node.js running in the system is:"
    node -v
    echo "Starting the Bitlyzer application now..."
    node server/server.js
else
    echo "Node.js is not installed in the system."
    echo "Please install it before executing the application again."
fi