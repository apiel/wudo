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

const SelectFollowFollower = (name, isForfollowedTags = false) => gql`
  fragment ${name} on UserTagEntity {
    follower { ...SelectUser }
    followed {
      ...SelectUser
      ${isForfollowedTags ? 'tags { ...SelectTag }' : ''}
    }
    tag { ...SelectTag }
  }

  ${SelectUser}
  ${SelectTag}
`;

export const SelectFollower = SelectFollowFollower('SelectFollower');
export const SelectFollowed = SelectFollowFollower('SelectFollowed', true);

export default SelectUserTag;