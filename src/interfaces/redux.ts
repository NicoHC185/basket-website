import { PaletteMode } from "@mui/material";
import { CounterState } from "store/slice/menu";

export interface ICustomRedux {
  isOpen: string[];
  defaultId: string;
  fontFamily: string;
  borderRadius: number | number[];
  opened: boolean;
  navType?: PaletteMode | undefined;
}

export interface IReduxState {
  menu?: CounterState;
  customizationReducer?: CounterState;
}
