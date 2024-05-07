import { createStyles } from 'antd-style';

export function useButtonStyle(prefix: string) {
  return createStyles(({ css, token }) => {
    return {
      button: css`
        &:disabled {
          opacity: ${token.opacityLoading};
          background-color: var(
            --ant-color-primary
          ); //doesn't work with token.colorPrimary, maybe a bug
          color: ${token.colorWhite};
        }
      `,
    };
  })();
}
