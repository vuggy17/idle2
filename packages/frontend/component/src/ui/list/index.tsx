import { createStyles } from 'antd-style';

export const useListStyle = (prefix: string) => {
  return createStyles(({ css }) => ({
    list: css`
      .${prefix}-item {
        background-color: transparent;
        padding-inline: 8px;
      }
      .${prefix}-item--active {
        background-color: white;
        border-radius: 4px;
      }
    `,
  }))();
};
