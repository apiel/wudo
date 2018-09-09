import PostEntity, { schemaEntity } from '../entity/post';

export const postSchema = `
${schemaEntity}
type PostResolver {
    posts: [PostEntity]
    yo: Int
}
`;

// @Resolver(PostResolver)
// @Resolver(PostEntity)
export default class PostResolver {
    // @Query(returns => [PostEntity])
    posts() {
        const entity = new PostEntity;
        entity.text = 'hello world';
        entity.user = 'alex@gmail.com';
        entity.tags = ['test', 'example'];
        entity.creationDate = new Date;
        return [entity];
    }

    yo() { return 345 }
}