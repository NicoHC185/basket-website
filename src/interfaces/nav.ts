import { TablerIconsProps } from "@tabler/icons-react";
import { IMenuChild } from "./menu";

// El tipo 'IMenuChild[] | undefined' no se puede asignar al tipo 'Element | undefined'.
// El tipo 'string | ((props: TablerIconsProps) => Element) | null | undefined' no se puede asignar al tipo 'string | undefined'.
export interface INavItem {
  caption?: string;
  children?: IMenuChild[] | undefined;
  chip?: {
    color?: string;
    variant?: string;
    size?: string;
    label?: string;
    avatar?: string;
  };
  disabled?: boolean;
  external?: string;
  icon?: ((props: TablerIconsProps) => JSX.Element) | string | undefined | null;
  id?: string;
  target?: string;
  url?: string;
  title?: string;
  type?: string;
}
