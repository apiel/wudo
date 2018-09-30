import selectUser from './selectUser';
import selectTag from './selectTag';

const select = `
{
  follower ${selectUser()}
  followed ${selectUser()}
  tag ${selectTag()}
  accepted
  active
  viewed
}
`;

export default select;