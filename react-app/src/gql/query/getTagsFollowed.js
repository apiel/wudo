import gql from 'graphql-tag';

import selectUserTag from '../fragment/userTag';

const template = gql`{
  getTagsFollowed {
    ...SelectUserTag
  }
}
${selectUserTag(true)}
`;

export default template;
