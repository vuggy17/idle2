import {
  ConfigProvider,
  type ConfigProviderProps,
  type GetProps,
  List as AntdList,
} from 'antd';

type ListProps = GetProps<typeof AntdList>;

const listConfig: ConfigProviderProps = {
  theme: {
    components: {},
  },
};
export default function List(props: ListProps) {
  return (
    <ConfigProvider {...listConfig}>
      <AntdList {...props} />
    </ConfigProvider>
  );
}
