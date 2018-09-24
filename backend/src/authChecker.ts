import { AuthChecker } from 'type-graphql';
import { get } from 'lodash';

import { Context } from "./context.interface";

// here we could have a session logic
// if we want to always check that the user
// is still valid (not banned)
// instead to rely on the 12h validity of the JWT

// We could also use a JWT valid only for 5min (or less)
// and then have a second token (checking for validity in db) to refresh the JWT
// But there would still be 5min

// Else create a JWT blacklist with redis or postgres hash table

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
