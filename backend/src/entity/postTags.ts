import 'reflect-metadata';
import {
  Entity,
  PrimaryColumn,
  // OneToMany,
  ManyToOne,
} from 'typeorm';

import TagEntity from './tag';
import PostEntity from './post';

@Entity({name: 'postTags'})
export default class PostTagsEntity {
  @PrimaryColumn()
  idPost: number;

  @PrimaryColumn()
  idTag: number;

  @ManyToOne(type => PostEntity, post => post.tags)
  post: PostEntity;

  @ManyToOne(type => TagEntity, tag => tag.posts)
  tag: TagEntity;
}
