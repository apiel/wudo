import gql from 'graphql-tag';

import selectUser from './select/selectUser';
import selectTag from './select/selectTag';

const select = `
  {
    idItem
    accepted
    active
    viewed
  }
`;

export const query = `
  getFollowers {
    users ${selectUser(`tags ${selectTag()}`)}
    tagsFollowedByUser {
      idTag
      users ${select}
    }
    followUserTags {
      idUser
      tags ${select}
    }
  }
`;

const template = gql`{ ${query} }`;

export default template;
