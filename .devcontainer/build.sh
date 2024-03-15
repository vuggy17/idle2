#!/bin/bash
# This is a script used by the devcontainer to build the project

# install dependencies
pnpm install

# Create database
npx nx prisma:db @idle/server

# Seed
npx nx seed @idle/server
