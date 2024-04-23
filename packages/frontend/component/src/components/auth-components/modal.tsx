import { Modal } from 'antd';
import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';

export type AuthModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function AuthModal({
  children,
  setOpen,
  open,
}: PropsWithChildren<AuthModalProps>) {
  return (
    <Modal
      getContainer={document.getElementById('root')!}
      open={open}
      width={400}
      onCancel={useCallback(() => setOpen(false), [setOpen])}
      centered
      destroyOnClose
      footer={null}
    >
      {children}
    </Modal>
  );
}
