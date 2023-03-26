import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import driversData from '../data/driversData';

const DriverProfile = () => {
  const [driver, setDriver] = useState(driversData.Drivers[0]);
  return (
    <Card sx={{ maxWidth: 400 }}>
      {driver && (
        <>
          <CardHeader
            title={`${driver.givenName} ${driver.familyName}`}
            subheader={driver.nationality}
          />
          <CardMedia
            component="img"
            height="300"
            image = {`${driversData.Drivers.find(drivers => drivers.givenName === `${driver.givenName}`).picture}`}
            alt={driver.code}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {driver.dateOfBirth}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {driver.permanentNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {driver.team}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default DriverProfile;
