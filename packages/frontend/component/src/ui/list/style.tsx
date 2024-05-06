import { createStyles } from 'antd-style';

export function useListStyle(prefix: string) {
  return createStyles(({ css, token }) => ({
    list: css`
      .${prefix}-item {
        background-color: transparent;
        padding-inline: 8px;
        border-radius: 4px;
      }

      &.hoverable {
        .${prefix}-item:hover {
          cursor: pointer;
          background-color: ${token.controlItemBgHover};
          transition: background-color 0.1s;
        }
      }
      &.selectable {
        .${prefix}-item--selected {
          background-color: rgba(255, 255, 255, 0.9);
        }
      }
    `,
  }))();
}
