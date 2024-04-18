import { TablerIconsProps } from "@tabler/icons-react";
import { ReactNode } from "react";
// import { ReactNode } from "react";

export interface IMenuList {
  id: string;
  title: string;
  type: string;
  url?: string;
  children?: Array<IMenuChild>;
  icon?: ((props: TablerIconsProps) => JSX.Element) | string | undefined | null;
  breadcrumbs?: JSX.Element | null;
}

export interface IMenuChild {
  id: string;
  title: string;
  type: string;
  url?: string;
  icon?: ((props: TablerIconsProps) => JSX.Element) | string | null;
  breadcrumbs?: boolean | null;
  disabled?: boolean;
}
export interface IMenu {
  id: string;
  title: string;
  type: string;
  url?: string;
  icon: (props: TablerIconsProps) => JSX.Element | ReactNode;
  breadcrumbs?: boolean | null;
  disabled?: boolean;
  children?: Array<IMenu>;
  caption?: string;
  target?: string;
  external?: boolean;
  chip?: {
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
    variant: "filled" | "outlined";
    size: "small" | "medium";
    label: string;
    avatar: JSX.Element;
  };
}
