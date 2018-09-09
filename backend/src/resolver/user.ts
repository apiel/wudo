import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import UserEntity from '../entity/user';

@Resolver(UserEntity)
export default class UserResolver {
    @Query(returns => UserEntity)
    getUser() {
        const entity = new UserEntity;
        entity.name = 'Alex';
        entity.email = 'alex@gmail.com';
        entity.idUser = 1;
        entity.creationDate = new Date;
        return entity;
    }
}
