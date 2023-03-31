import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const DriverDialog = (props) => {
  const { onClose, selectedValue, open, race, driver } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Typography>Confrim Driver Selection</Typography>
      <Typography>
        {driver}
        {race}
      </Typography>
    </Dialog>
  );
};

export default DriverDialog;
