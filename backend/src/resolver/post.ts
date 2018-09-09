import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

import PostEntity from '../entity/post';
import UserResolver from '../resolver/user';
import TagResolver from '../resolver/tag';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts() {
        const user = new UserResolver;
        const tag = new TagResolver;
        const entity = new PostEntity;
        entity.text = 'hello world';
        entity.user = user.getUser();
        entity.tags = [tag.getTag()];
        entity.creationDate = new Date;
        return [entity];
    }
}
