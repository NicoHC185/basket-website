'use client'

import { Skeleton, Stack, Typography } from "@mui/material"
import MainCard from "components/cards/MainCard"
import { IInfoPlayer, IInfoTeam } from "interfaces"
import moment from "moment"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { axiosService } from "services/axios"
import TableRoster from "./TableRoster"
import SubCard from "components/cards/SubCard"

const Team = () => {
  const { teamId } = useParams()
  const [infoTeam, setInfoTeam] = useState<IInfoTeam | null>(null)
  const [roster, setRoster] = useState<IInfoPlayer[]>([])
  const [load, setLoad] = useState(true)

  const bodyPost = {
    codeTeam: String(teamId).toUpperCase(),
    year: moment().format('YYYY')
  }

  useEffect(() => {
    Promise.all([getInfoTeam(), getRoster()]).then(res => {
      const infoTeam: IInfoTeam = res[0]
      const roster: IInfoPlayer[] = res[1]
      setInfoTeam(infoTeam)
      setRoster(roster)
      setLoad(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInfoTeam = () => {

    return new Promise<IInfoTeam>((resolve: Function, reject) => {
      axiosService.post('team', bodyPost)
        .then(({ data }: { data: IInfoTeam }) => {
          resolve(data)
        }).catch(err => {
          reject(err.message)
        })
    })
  }

  const getRoster = () => {

    return new Promise<IInfoPlayer[]>((resolve: Function, reject) => {
      axiosService.post('team/roster', bodyPost)
        .then(({ data }: { data: IInfoTeam }) => {
          resolve(data)
        }).catch(err => {
          reject(err.message)
        })
    })
  }

  return (

    load ? <Skeleton variant="rounded" width={'100%'} height={'60vh'} /> :
      <MainCard title={infoTeam?.name}>
        <SubCard title="Info team">
          <Stack>
            <Typography>Record: {infoTeam?.record}</Typography>
            <Typography>Coach: {infoTeam?.coach}</Typography>
            <Typography>Executive: {infoTeam?.executive}</Typography>
          </Stack>
        </SubCard>

        <Typography variant="h3" sx={{ my: 3 }}>Roster</Typography>
        <TableRoster data={roster}></TableRoster>

      </MainCard >

  )
}

export default Team