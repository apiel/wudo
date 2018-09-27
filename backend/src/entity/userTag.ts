import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import UserEntity from './user';
import TagEntity from './tag';

@Entity({name: 'user_tag'})
export default class UserTagEntity {
  @ManyToOne(type => UserEntity, user => user.followUserTags, { primary: true })
  follower: Promise<UserEntity>;

  @ManyToOne(type => UserEntity, user => user.tagsFollowedByUser, { primary: true })
  followed: Promise<UserEntity>;

  @ManyToOne(type => TagEntity, tag => tag.users, { primary: true })
  tag: Promise<TagEntity>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  accepted: Date;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  active: Date;

  @Column({ nullable: true })
  viewed: Date;
}
