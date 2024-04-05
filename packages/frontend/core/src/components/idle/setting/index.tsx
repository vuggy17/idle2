import { ConfigProvider, Layout, Modal } from 'antd';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { settingAtom } from '../../../atoms/setting';
import AccountSetting from './account-setting';
import SettingSidebar from './sidebar';
import { contentInnerWrapper, tabContentWrapper } from './style.css';

function SettingModalInner() {
  return (
    <Layout className={contentInnerWrapper}>
      <SettingSidebar activeTab="my-account" />
      <Layout.Content className={tabContentWrapper}>
        <AccountSetting />
      </Layout.Content>
    </Layout>
  );
}

export function SettingModal() {
  const [settingStore, setSettingStore] = useAtom(settingAtom);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgElevated: '#f5f5f5',
            paddingContentHorizontalLG: 0,
          },
          Layout: {
            lightSiderBg: 'transparent',
            headerHeight: 'auto' as any,
            headerBg: 'transparent',
            headerPadding: '0px 0px',
            paddingContentHorizontalLG: '0 20px' as any,
          },
          Menu: {
            itemBg: 'transparent',
            itemHeight: 32,
          },
        },
      }}
    >
      <Modal
        closeIcon={false}
        getContainer={document.getElementById('root')!}
        open={settingStore.open}
        width={1080}
        centered
        destroyOnClose
        footer={null}
        onCancel={useCallback(
          () => setSettingStore((prev) => ({ ...prev, open: false })),
          [setSettingStore],
        )}
      >
        <SettingModalInner />
      </Modal>
    </ConfigProvider>
  );
}
