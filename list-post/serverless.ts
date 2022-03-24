import type { AWS } from '@serverless/typescript';

import ListPost from '@functions/list-post';

const serverlessConfiguration: AWS = {
  service: 'list-post',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region:'us-east-1',
    iamRoleStatements: 
    [
      {
        Effect:'Allow',
        Action:['dynamodb:Query','dynamodb:Scan','dynamodb:GetItem','dynamodb:PutItem','dynamodb:UpdateItem','dynamodb:DeleteItem'],
        Resource:'arn:aws:dynamodb:us-east-1:*:*'
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      POST_TABLE:'posts',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { ListPost },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
