// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Blog, Todo } = initSchema(schema);

export {
  Post,
  Blog,
  Todo
};