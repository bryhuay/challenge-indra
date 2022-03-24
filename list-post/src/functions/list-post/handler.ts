import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import PostRepository from '../../repositories/post.repository'
import schema from './schema';
import { Logger } from '@aws-lambda-powertools/logger';

// Logger parameters fetched from the environment variables (see template.yaml tab)
const logger = new Logger();

const listPosts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  
  try{
    const postRepository = new PostRepository();
    const posts: any[] = await postRepository.getAllPost();

    posts.map(x=>{
      x.createdDate= new Date(x.createdAt);
      return x;
    })


    return {
      statusCode: 200,
      body: JSON.stringify({
          code: 0,
          message: 'List of posts.',
          data: posts
      })
    };
  }
  catch(err){
    logger.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
          code: 500,
          message: 'Error Internal of server.',
          data: null
      })
    };
  }
  
};

export const main = middyfy(listPosts);
