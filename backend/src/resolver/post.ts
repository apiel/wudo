import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import PostEntity from '../entity/post';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
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
