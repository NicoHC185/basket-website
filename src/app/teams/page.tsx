'use client'
import { Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import MainCard from 'components/cards/MainCard'
import Logos from 'icons'
import { IConference } from 'interfaces'
import { useEffect, useState } from 'react'
import { findLogo } from 'utils'
import TeamCard from './Team'

const url = 'http://localhost:3000/api'

const Teams = () => {

  const [conferences, setConferences] = useState<IConference[]>([])

  useEffect(() => {
    getTeams()
  }, [])

  const getTeams = () => {
    try {
      handleGetTeam()
    } catch (err) {
      console.log('err', err);
    }
  }

  const handleGetTeam = async () => {
    const { data } = await axios.get(`${url}/teams`)
    setConferences(data)
  }



  return (
    <MainCard title="Teams">
      {
        conferences.map(conference => (
          <Stack spacing={2} sx={{ py: 2 }}>
            <Typography variant='h4'>{conference.name}</Typography>
            <Grid container spacing={2}>
              {
                conference.teams.map(team =>
                  <Grid item>
                    <TeamCard team={team}></TeamCard>
                  </Grid>
                )
              }
            </Grid>
          </Stack>
        ))
      }
    </MainCard>
  )
}

export default Teams