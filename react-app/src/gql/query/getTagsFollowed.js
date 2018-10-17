import gql from 'graphql-tag';

import SelectUserTag, { SelectFollowed } from '../fragment/userTag';

const template = gql`{
  getTagsFollowed {
    ...SelectFollow
    ...SelectUserTag
  }
}
${SelectUserTag}
${SelectFollowed}
`;

export default template;
