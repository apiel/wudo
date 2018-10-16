import gql from 'graphql-tag';

import selectUser from './user';
import selectTag from './tag';

const fragment = (followedTags = false) => gql`
  fragment SelectUserTag on UserTagEntity {
    follower { ...SelectUser }
    followed {
      ...SelectUser
      ${followedTags ? 'tags { ...SelectTag }' : ''}
    }
    tag { ...SelectTag }
    accepted
    active
    viewed
  }

  ${selectUser}
  ${selectTag}
`;

export default fragment;