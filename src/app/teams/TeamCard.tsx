import { Card, CardContent, CardHeader, Link, Paper, Stack, styled, useTheme } from "@mui/material"
import { ITeam } from "interfaces"
import { useEffect, useMemo } from "react"
import { findLogo } from "utils"
import colors from '@public/assets/scss/_themes-vars.module.scss';
// import Link from "next/link";

const PaperResult = ({ team, field }: { team: ITeam, field: 'victories' | 'defeats' }) => {
  const theme = useTheme()
  const bgColor = useMemo(() => {
    return field === 'victories' ? theme.palette.success.light : theme.palette.error.light
  }, [field])
  return <Paper variant="outlined"
    sx={{ width: 60, height: 30, textAlign: "center", alignContent: 'center', mx: 1, backgroundColor: bgColor }}
  >{team[field]}</Paper>
}

const TeamCard = ({ team }: { team: ITeam }) => {

  return (
    <Link href={`/teams/${team.code}`} underline="none" sx={{
      minHeight: '239.350px'
    }}>
      <Card sx={{
        ':hover': {
          boxShadow: 20, // theme.shadows[20]
        },
        maxWidth: '184px',
      }}>
        <CardHeader title={team.name} sx={{ textAlign: 'center', minHeight: `${37.350 + 32}px`, pb: 0 }}></CardHeader>
        <CardContent sx={{ pt: 0 }}>
          <Stack justifyContent={'center'} alignItems={'center'}>
            {findLogo(String(team.code))}
            <div style={{
              display: 'flex',
              justifyContent: "center",
              width: '100%',
              height: '100%',
            }}>
              <PaperResult team={team} field={'victories'}></PaperResult>
              <PaperResult team={team} field={'defeats'}></PaperResult>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TeamCard