export interface ITeam {
  name: string | undefined;
  victories: string | undefined;
  defeats: string | undefined;
  code: string | undefined;
}

export interface IConference {
  name: string | null | undefined;
  teams: Array<ITeam>;
}

export interface IInfoPlayer {
  number: string | undefined | null;
  player: string | undefined | null;
  playerPos: string | undefined | null;
  playerCountry: string | undefined | null;
  playerRef: string | undefined;
}
