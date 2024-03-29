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
