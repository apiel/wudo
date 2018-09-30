import selectUser from './selectUser';
import selectTag from './selectTag';

const select = ({ followedParams = '' } = {}) => `
{
  follower ${selectUser()}
  followed ${selectUser(followedParams)}
  tag ${selectTag()}
  accepted
  active
  viewed
}
`;

export default select;