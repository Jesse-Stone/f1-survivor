import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const getDrivers = async () => {
  const response = await axios.get('https://ergast.com/api/f1/2023/drivers.json');
  console.log(response.data.MRData.DriverTable.Drivers)
  return response.data.MRData.DriverTable.Drivers;
};

const DriverList = () => {
  const { data: drivers, isLoading, isError } = useQuery('drivers', getDrivers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {drivers.map((driver) => (
        <div key={driver.driverId}>
          <h2>{driver.givenName} {driver.familyName}</h2>
          <p>{driver.nationality}</p>
        </div>
      ))}
    </div>
  );
};

export default DriverList;