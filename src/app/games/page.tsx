'use client'

import { Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import MainCard from "components/cards/MainCard";
import { useEffect, useState } from "react";
import DateComponent from 'components/DateComponent'
import moment, { Moment } from "moment";
import { IPartidos } from "./dto";
import { findLogo } from "utils";

function checkCode(code: string): string {
  switch (code) {
    case "bkn":
      return "brk";
    case "cha":
      return "cho";
    case "phx":
      return "pho";
    default:
      return code || "";
  }
}


export default function PartidosNBA() {

  const [partidos, setPartidos] = useState<IPartidos[]>([])
  const [date, setDate] = useState<Moment | null>(moment())

  useEffect(() => {
    getPartidosByDate({ date: moment(date).format('YYYY-MM-DD') })
  }, [date])


  const getPartidosByDate = ({ date }: { date: string }) => {
    axios.get(`https://v2.nba.api-sports.io/games?date=${date}`,
      {
        headers: {
          "x-apisports-key": process.env.NEXT_PUBLIC_API_SPORTS
        }
      }
    ).then(({ data }) => {

      // console.log('RES', data);
      setPartidos(data.response)

    }).catch(err => {
      console.log('err', err);
    })


  }

  const statusGame = (status: {
    halftime: boolean,
    long: string,
  }) => {
    if (status.halftime) {
      return 'Halftime'
    }
    return status.long
    //     halftime:
    // false
  }

  const isPlaysOff = (league: string) => {
    if (league === 'standard') {
      return false
    }
    return true
  }

  return (
    <MainCard title='Games'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DateComponent value={date} handleChange={(value: Moment | null) => {
            setDate(value)
          }}></DateComponent>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1}>Local</TableCell>
                  <TableCell align="center" colSpan={1}></TableCell>
                  <TableCell align="center" colSpan={1}>Visit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partidos.map((row, idx) => (
                  <TableRow
                    key={idx}
                  >
                    <TableCell align="center">
                      <Stack justifyContent={'center'}>
                        <div>
                          {findLogo(checkCode(row.teams.home.code.toLowerCase()))}
                        </div>
                        <Typography>

                          {row.teams.home.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Grid container direction={'column'} justifyContent={'center'} spacing={0.5}>
                        {
                          isPlaysOff(row.league) &&
                          <Grid item >
                            <Typography>Playoff</Typography>
                          </Grid>
                        }
                        <Grid item >
                          <Typography>{`${row.scores.home.points} - ${row.scores.visitors.points}`}</Typography>
                        </Grid>
                        <Grid item >
                          <Typography>{statusGame(row.status)}</Typography>
                        </Grid>
                        <Grid item >
                          <Typography>{`${row.arena.name} - ${row.arena.city}`}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <Stack justifyContent={'center'}>
                        <div>
                          {findLogo(checkCode(row.teams.visitors.code).toLowerCase())}
                        </div>
                        <Typography>

                          {row.teams.visitors.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Stack direction={'row'} spacing={50} justifyContent={'center'}>
          <Typography variant="h4">Local</Typography>
          <Typography variant="h4">Visita</Typography>
        </Stack> */}
        </Grid>
      </Grid>
    </MainCard>
  )
}