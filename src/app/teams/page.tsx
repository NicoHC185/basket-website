'use client'
import Logos from 'icons'
import { useEffect } from 'react'
import { findLogo } from 'utils'

const Teams = () => {

  useEffect(() => {

    const res = [
      {
        "id": 13570,
        "league": "standard",
        "season": 2023,
        "date": {
          "start": "2024-03-24T00:00:00.000Z",
          "end": null,
          "duration": null
        },
        "stage": 2,
        "status": {
          "clock": null,
          "halftime": false,
          "short": 3,
          "long": "Finished"
        },
        "periods": {
          "current": 4,
          "total": 4,
          "endOfPeriod": false
        },
        "arena": {
          "name": "Capital One Arena",
          "city": "Washington",
          "state": "DC",
          "country": null
        },
        "teams": {
          "visitors": {
            "id": 38,
            "name": "Toronto Raptors",
            "nickname": "Raptors",
            "code": "TOR",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png"
          },
          "home": {
            "id": 41,
            "name": "Washington Wizards",
            "nickname": "Wizards",
            "code": "WAS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png"
          }
        },
        "scores": {
          "visitors": {
            "win": 0,
            "loss": 0,
            "series": {
              "win": 0,
              "loss": 0
            },
            "linescore": [
              "25",
              "23",
              "33",
              "28"
            ],
            "points": 109
          },
          "home": {
            "win": 0,
            "loss": 0,
            "series": {
              "win": 0,
              "loss": 0
            },
            "linescore": [
              "23",
              "28",
              "26",
              "35"
            ],
            "points": 112
          }
        },
        "officials": [],
        "timesTied": null,
        "leadChanges": null,
        "nugget": null
      }
    ]

    console.log('res', res);
  }, [])

  return findLogo('den')
}

export default Teams