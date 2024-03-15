import { createStyles } from 'antd-style';

export const useListStyle = (prefix: string) => {
  return createStyles(({ css }) => ({
    list: css`
      /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
      /* backdrop-filter: blur(5px); */
      /* border: 1px solid rgba(255, 255, 255, 0.2); */
      /* background: rgba(255, 255, 255, 0.2); */
      .${prefix}-item {
        background-color: rgba(235, 235, 235, 0.16);
      }
    `,
  }))();
};
