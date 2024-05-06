import type { ListProps as AntdListProps } from 'antd';
import { List as AntdList } from 'antd';
import classNames from 'classnames';

interface ListProps<T> extends AntdListProps<T> {
  hoverable?: boolean;
  selectable?: boolean;
}

export function List<T>({
  hoverable = false,
  selectable = false,
  ...componentProps
}: ListProps<T>) {
  let cls = '';
  if (selectable) {
    cls = classNames(['hoverable', 'selectable']);
  } else if (hoverable) {
    cls = classNames(['hoverable']);
  }
  return <AntdList rootClassName={cls} {...componentProps} />;
}

List.defaultProps = {
  hoverable: false,
  selectable: false,
};
List.Item = AntdList.Item;
