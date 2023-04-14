import { AppBar, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const UserIcon = (props) => {
  const { user } = props;
  return (
    <Stack position={'fixed'}>
        {/* <Typography>{user}</Typography> */}
    </Stack>
  );
};

export default UserIcon;
