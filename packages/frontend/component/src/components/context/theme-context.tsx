import { ConfigProvider, theme } from 'antd';
import { type PropsWithChildren, useContext } from 'react';

import { useListStyle } from '../../ui/list/index';

export function ThemeConfig({ children }: PropsWithChildren) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  // List
  const { styles } = useListStyle(getPrefixCls('list'));

  return (
    <ConfigProvider
      key="theme-provider"
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: theme.darkAlgorithm,
      }}
      list={{ className: styles.list }}
    >
      {children}
    </ConfigProvider>
  );
}
