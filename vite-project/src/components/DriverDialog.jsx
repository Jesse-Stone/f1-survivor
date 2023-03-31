import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const emails = ['username@gmail.com', 'user02@gmail.com'];

const DriverDialog = (props) => {
  const { onClose, selectedValue, open, race, driver } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Typography>
      Confrim Driver Selection
      </Typography>
      <Typography>
      {driver}
    {race}
      </Typography>
    </Dialog>
  );
}

export default DriverDialog;