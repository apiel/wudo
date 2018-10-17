import gql from 'graphql-tag';

import SelectUserTag, { SelectFollow } from '../fragment/userTag';

const template = gql`{
  getTagsFollowed {
    ...SelectFollow
    ...SelectUserTag
  }
}
${SelectUserTag}
${SelectFollow(true)}
`;

export default template;
