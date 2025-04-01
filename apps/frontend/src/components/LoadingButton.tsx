import { Loader2, LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

import { Button, ButtonProps } from '~/components/ui/button';

type LoadingButtonProps = {
  readonly label: string | undefined;
  readonly Icon: LucideIcon;
  readonly isLoading: boolean;
} & ButtonProps;

export const LoadingButton = ({
  label,
  Icon,
  isLoading,
  ...buttonProps
}: LoadingButtonProps): ReactElement => (
  <Button className="flex items-center gap-2" disabled={isLoading} {...buttonProps}>
    {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Icon size={16} />}
    {label !== undefined && <span>{label}</span>}
  </Button>
);
