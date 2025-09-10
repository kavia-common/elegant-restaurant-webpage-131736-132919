#!/bin/bash
cd /home/kavia/workspace/code-generation/elegant-restaurant-webpage-131736-132919/restaurant_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

