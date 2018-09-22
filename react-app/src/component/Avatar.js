import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ColorHash from 'color-hash';

const ProfileAvatar = ({ user, useHashColor = true }) => {
  const backgroundColor = useHashColor && (new ColorHash()).hex(user.name);

  return (
    <Avatar style={{ backgroundColor }} src={user.avatar}>
      {user.name[0]}
    </Avatar>
  );
};

ProfileAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  useHashColor: PropTypes.bool,
};

export default ProfileAvatar;