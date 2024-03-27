export interface IPartidos {
  id: number;
  league: string;
  season: number;
  date: {
    start: string;
    end: string | null;
    duration: string | null;
  };
  stage: number;
  status: {
    clock: string | null;
    halftime: boolean;
    short: number;
    long: string;
  };
  periods: {
    current: number;
    total: number;
    endOfPeriod: boolean;
  };
  arena: {
    name: string;
    city: string;
    state: string;
    country: string | null;
  };
  teams: {
    visitors: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
    home: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
  };
  scores: {
    visitors: {
      win: number;
      loss: number;
      series: {
        win: number;
        loss: number;
      };
      linescore: Array<string>; //["25", "23", "33", "28"];
      points: number;
    };
    home: {
      win: number;
      loss: number;
      series: {
        win: number;
        loss: number;
      };
      linescore: Array<string>;
      points: number;
    };
  };
  officials: Array<string>;
  timesTied: string | null;
  leadChanges: string | null;
  nugget: string | null;
}
