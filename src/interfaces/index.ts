import { TablerIconsProps } from "@tabler/icons-react";
import { ReactNode } from "react";

export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IMenuList {
  id: string;
  title: string;
  type: string;
  children: Array<IMenuChild>;
}

export interface IMenuChild {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  // icon: () => ;
  breadcrumbs: false;
  disabled?: boolean;
}

export interface INavItem {
  caption?: any;
  children?: any;
  chip?: {
    color?: any;
    variant?: any;
    size?: any;
    label?: any;
    avatar?: any;
  };
  disabled?: any;
  external?: any;
  icon?: any;
  id?: any;
  target?: any;
  url?: any;
  title?: any;
  type?: string;
}
