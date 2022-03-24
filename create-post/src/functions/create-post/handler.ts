import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as uuid from 'uuid'
import { Post } from '../../models/post';
import PostRepository from '../../repositories/post.repository';
import SwapiFilmRepository from '../../repositories/swapi-film.repository'
import schema from './schema';
import { Logger } from '@aws-lambda-powertools/logger';

// Logger parameters fetched from the environment variables (see template.yaml tab)
const logger = new Logger();

const createPost: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    
    const postRepository = new PostRepository();
    const { author } = event.body;
    const { review } = event.body;
    const { title } = event.body;
    const { observation } = event.body;
    const id = uuid.v4();
    const blog: Post= { id, author, review, title, observation, createdAt: new Date().getTime()};
    const save = await postRepository.createPost(blog)
    const swapiRepository = new SwapiFilmRepository();
    const filmDetail:any = await swapiRepository.getFilm('1');
    const dataResponse = Object.assign(save,{film:filmDetail.data});
   
    return {
      statusCode: 201,
      body: JSON.stringify({
          code: 0,
          message: 'Created successfully.',
          data: dataResponse
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

export const main = middyfy(createPost);
