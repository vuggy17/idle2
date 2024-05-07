import { ConfigProvider } from 'antd';
import { type PropsWithChildren, useContext } from 'react';

import { useButtonStyle } from '../../ui/button/style';
import { useListStyle } from '../../ui/list/style';

export function ThemeConfig({ children }: PropsWithChildren) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  // List
  const { styles } = useListStyle(getPrefixCls('list'));
  const { styles: btnStyle } = useButtonStyle(getPrefixCls('button'));

  return (
    <ConfigProvider
      key="theme-provider"
      theme={{
        cssVar: true,
        hashed: false,
      }}
      list={{ className: styles.list }}
      button={{ className: btnStyle.button }}
    >
      {children}
    </ConfigProvider>
  );
}
