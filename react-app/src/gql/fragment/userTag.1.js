import gql from 'graphql-tag';

import selectUser from './user';
import selectTag from './tag';

const fragment = gql`
  fragment SelectUserTag on UserTagEntity {
    accepted
    active
    viewed
  }
`;

// export const selectFollower = gql`
//   fragment SelectFollower on UserTagEntity {
//     { ...SelectUserTag }
//     follower { ...SelectUser }
//     followed { ...SelectUser }
//     tag { ...SelectTag }
//   }

//   ${fragment}
//   ${selectUser}
//   ${selectTag}
// `;

// export const selectFollowed = gql`
//   fragment SelectFollower on UserTagEntity {
//     { ...SelectUserTag }
//     follower { ...SelectUser }
//     followed {
//       ...SelectUser
//       tags: { ...SelectTag }
//     }
//     tag { ...SelectTag }
//   }

//   ${fragment}
//   ${selectUser}
//   ${selectTag}
// `;

export const selectFollower = gql`
  fragment SelectFollower on UserTagEntity {
    follower { ...SelectUser }
    followed { ...SelectUser }
    tag { ...SelectTag }
  }

  ${selectUser}
  ${selectTag}
`;

export const selectFollowed = gql`
  ${fragment}
`;


export default fragment;