import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import TagEntity from '../entity/tag';

@Resolver(TagEntity)
export default class TagResolver {
    @Query(returns => TagEntity)
    getTag() {
        // const { db } = 
        const entity = new TagEntity;
        entity.name = 'test';
        entity.idTag = 1;
        entity.creationDate = new Date;
        return entity;
    }
}
