import { Avatar, Modal, Space, Typography } from 'antd';
import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';

import { subTitle } from './header.css';

export type AuthModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function AuthModal({
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

function ModalHeader({ title, logo }: { title: string; logo: string }) {
  return (
    <div>
      <Space>
        <Avatar src={logo} size={28} />
        <Typography.Text className={subTitle} strong>
          {title}
        </Typography.Text>
      </Space>
      <Typography.Text className={title} strong>
        Idle chat
      </Typography.Text>
    </div>
  );
}

AuthModal.Header = ModalHeader;

export { AuthModal };
