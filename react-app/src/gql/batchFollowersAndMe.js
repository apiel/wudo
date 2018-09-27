import gql from 'graphql-tag';

import { query as followersQuery} from './getFollowers';
import { query as meQuery} from './getMe';

// const select = `
//   {
//     idItem
//     accepted
//     active
//     viewed
//   }
// `;

// const template = gql`
//   {
//     getMe ${selectUser(`tags ${selectTag()}`)}
//     getFollowers {
//       users ${selectUser(`tags ${selectTag()}`)}
//       tagsFollowedByUser {
//         idTag
//         users ${select}
//       }
//       followUserTags {
//         idUser
//         tags ${select}
//       }
//     }
//   }
// `;

const template = gql`
  {
    ${followersQuery}
    ${meQuery}
  }
`;

export default template;