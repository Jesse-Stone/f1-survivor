import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import driversData from '../data/driversData';

const DriverProfile = ({driver}) => {
  const { givenName, familyName, nationality, permanentNumber, team } = driver;

  return (
    <Card sx={{ maxWidth: 400 }}>
      {driver && (
        <>
          <CardHeader
            title={`${givenName} ${familyName}`}
            subheader={nationality}
          />
          <CardMedia
            component="img"
            height="300"
            image = {`${driversData.Drivers.find(drivers => drivers.givenName === `${driver.givenName}`).picture}`}
            alt={driver.code}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {permanentNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {team}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default DriverProfile;
