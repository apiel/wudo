import gql from 'graphql-tag';

import selectUser from './select/selectUser';
import selectTag from './select/selectTag';

const template = gql`
{
    getFollowers {
      users ${selectUser}
      tags ${selectTag}
      tagsFollowedByUser {
        idTag
        users {
          id
          accepted
        }
      }
      followUserTags {
        idUser
        tags {
          id
          accepted
        }
      }
    }
  }
`;

export default template;
