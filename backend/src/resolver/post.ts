import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

import PostEntity from '../entity/post';
import UserResolver from '../resolver/user';
import TagResolver from '../resolver/tag';

@Resolver(PostEntity)
export default class PostResolver {
    constructor(...yo) {
        console.log('PostResolver', yo);
    }

    @Query(returns => [PostEntity])
    getPosts(...yo) {
        console.log('getPosts args', yo);
        const user = new UserResolver;
        const tag = new TagResolver;
        const entity = new PostEntity;
        entity.text = `hello world ${123}`;
        entity.user = user.getUser();
        entity.tags = [tag.getTag()];
        entity.creationDate = new Date;
        return [entity];
    }
}
