import { Toast } from 'primereact/toast';
import { forwardRef } from 'react';

export type ToastSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast';

export interface ToastMessage {
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
}

const AppToast = forwardRef<Toast, {}>((_, ref) => {
  return <Toast ref={ref} />;
});

AppToast.displayName = 'AppToast';

export default AppToast;
