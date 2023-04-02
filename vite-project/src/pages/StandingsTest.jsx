import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { getDocs, collection, query, where} from 'firebase/firestore';

import { groupBy } from 'lodash';



function StandingsTest() {
  const [picks, setPicks] = useState([])
  const [scores, setScores] = useState([]);

  useEffect(()=> { 
    const getPicks = async () => {
      const data = await query(getDocs(collection(db, 'picks')))
      setPicks(data.docs.map((doc)=>({...doc.data(), id: doc.id })))
    };
      getPicks()
  },[])

  const data = groupBy(picks, pick => pick.userId )
  console.log(data)

  useEffect(() => {
    axios.get('https://ergast.com/api/f1/current/results.json')
      .then(response => {
        const races = response.data.MRData.RaceTable.Races;
        const newScores = [];


        getDocs(collection(db, 'picks'))
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              const userId = doc.data().userId
              const picks = doc.data().driverId;




              // let totalPoints = 0;
              // picks.forEach(pick => {
              //   const raceId = pick.raceId;
              //   const driverId = pick.driverId;
              //   const race = races.find(race => race.Circuit.circuitId === raceId);

              //   if (race) {
              //     const results = race.Results;
              //     const result = results.find(result => result.Driver.driverId === driverId);
                  
              //     if (result) {
              //       totalPoints += result.points;
              //     }
              //   }
              // });

              // newScores.push({ userId: userId, points: totalPoints });
            });

            setScores(newScores);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'points', headerName: 'Points', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={scores} columns={columns} sortModel={[{ field: 'points', sort: 'desc' }]} />
    </div>
  );
}

export default StandingsTest;