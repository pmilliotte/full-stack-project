import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';

import { Breadcrumb, useBreadcrumbContext } from '~/lib/context/useBreadcrumb';

// const BASE_BREADCRUMB = { label: 'Acceuil', linkTo: '/' };

export const useBreadcrumb = (breadcrumbInput: Breadcrumb): void => {
  const { setBreadcrumb } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumb?.((prevBreadcrumb) =>
      isEqual(prevBreadcrumb, breadcrumbInput) ? prevBreadcrumb : breadcrumbInput
    );
  }, [breadcrumbInput, setBreadcrumb]);

  useEffect(
    () => (): void => {
      setBreadcrumb?.([]);
    },
    [setBreadcrumb]
  );
};
