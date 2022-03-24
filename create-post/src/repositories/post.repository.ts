import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Post } from '../models/post'

export default class PostRepository {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly todoTable = process.env.POST_TABLE) {
  }
  
  async createPost(newPost:Post): Promise<Post> {
    await this.docClient.put({
      TableName: this.todoTable,
      Item: newPost
    }).promise()

    return newPost
  }

  
}
//Para probar en BD local
/*
function createDynamoDBClient() { 
  
  return new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  
}
*/