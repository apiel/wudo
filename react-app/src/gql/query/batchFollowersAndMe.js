import gql from 'graphql-tag';

import { query as followersQuery} from './getFollowers';
import { query as meQuery} from './getMe';

const template = gql`
  {
    ${followersQuery}
    ${meQuery}
  }
`;

export default template;