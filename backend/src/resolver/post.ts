import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import PostEntity from '../entity/post';
import UserResolver from '../resolver/user';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts() {
        const user = new UserResolver;
        const entity = new PostEntity;
        entity.text = 'hello world';
        entity.user = user.getUser();
        entity.tags = ['test', 'example'];
        entity.creationDate = new Date;
        return [entity];
    }
}
