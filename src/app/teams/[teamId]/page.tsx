'use client'

import MainCard from "components/cards/MainCard"
import { useParams } from "next/navigation"

const Team = () => {

  const { teamId } = useParams()
  return (
    <MainCard title={`Team ${teamId}`}>
    </MainCard>
  )
}

export default Team