# espnff-stats
ESPN Fantasy Football Stats

# Usage

## Install

1. Install latest node
1. Install and configure aws cli
1. npm i -g yarn
1. npm i -g serverless

## Run Locally

Configure .env and client/.env.development to use your espn cookies and your league name. See .env.example

Terminal 1
```bash
$ yarn
$ sls offline start --stage dev --region us-west-2
```

Terminal 2
```bash
$ cd client/
$ yarn && yarn start
```

GraphQL Playground http://localhost:4000/graphql

# Deploy to AWS

1. configure .env and client/.env.production. See .env.example
1. sls deploy --stage dev --region us-west-2
1. sls client deploy --stage dev --region us-west-2