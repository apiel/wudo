import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';

import PostEntity from '../entity/post';
import UserResolver from '../resolver/user';
import TagResolver from '../resolver/tag';

@Resolver(PostEntity)
export default class PostResolver {
    @Query(returns => [PostEntity])
    getPosts(@Ctx() ctx) {
        // const user = new UserResolver;
        // const tag = new TagResolver();
        // const entity = new PostEntity;
        // entity.text = `hello world ${123}`;
        // entity.user = user.getUser();
        // entity.tags = tag.getTags(ctx); // this go away anyway
        // entity.creationDate = new Date;
        // return [entity];

        const yo = ctx.db.getRepository(PostEntity).find({ relations: ['tags', 'tags.post'] });
        // const yo = ctx.db.getRepository(PostEntity)
        //             .createQueryBuilder('p')
        //             .innerJoin('p.tags', 't').getMany();
        yo.then(val => console.log('yooooooval', val));
        return yo;
    }
}
