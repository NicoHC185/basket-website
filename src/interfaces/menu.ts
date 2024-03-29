import { TablerIconsProps } from "@tabler/icons-react";

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
