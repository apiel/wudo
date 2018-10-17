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

const SelectFollowFollower = (isForfollowedTags = false) => gql`
  fragment SelectFollow on UserTagEntity {
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

export const SelectFollower = SelectFollowFollower();
export const SelectFollowed = SelectFollowFollower(true);

export default SelectUserTag;