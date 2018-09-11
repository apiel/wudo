import { MiddlewareFn } from 'type-graphql';

export const test: MiddlewareFn = async (more, next) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  console.log(`${more.info.parentType.name}.${more.info.fieldName} [${resolveTime} ms]`);
  // console.log('more more more', more.context.db); // yes it does!!
};