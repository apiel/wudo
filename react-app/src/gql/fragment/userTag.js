import gql from 'graphql-tag';

import SelectUser from './user';
import SelectTag from './tag';

const SelectUserTag = gql`
  fragment SelectUserTag on UserTagEntity {
    accepted
    active
    viewed
  }
`;

export const SelectFollow = (followedTags = false) => gql`
  fragment SelectFollow on UserTagEntity {
    follower { ...SelectUser }
    followed {
      ...SelectUser
      ${followedTags ? 'tags { ...SelectTag }' : ''}
    }
    tag { ...SelectTag }
  }

  ${SelectUser}
  ${SelectTag}
`;

export default SelectUserTag;