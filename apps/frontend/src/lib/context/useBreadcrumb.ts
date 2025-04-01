import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type Breadcrumb = { label: string; linkTo?: string }[];

export type BreadcrumbContextType = {
  breadcrumb: Breadcrumb;
  setBreadcrumb?: Dispatch<SetStateAction<Breadcrumb>>;
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumb: [],
});

export const useBreadcrumbContext = (): BreadcrumbContextType => useContext(BreadcrumbContext);
