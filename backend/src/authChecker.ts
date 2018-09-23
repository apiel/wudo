import { AuthChecker } from 'type-graphql';
import { get } from 'lodash';

import { Context } from "./context.interface";

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  // console.log('authChecker', user, roles);
  if (roles.length === 0) {
    // if `@Authorized()`, check only is user exist
    return !!user;
  }

  // @Authorized(['ADMIN'])
  const userRoles = get(user, 'roles', []); // if user exist and has roles
  if (userRoles.some(role => roles.includes(role))) {
    return true;
  }

  // no roles matched, restrict access
  return false;
};

export default authChecker;
