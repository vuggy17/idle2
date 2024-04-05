import { style } from '@vanilla-extract/css';

export const contentInnerWrapper = style({
  height: 720,
});

export const tabContentWrapper = style({
  background: 'white',
  paddingLeft: 20,
});

export const sidebarHeader = style({
  paddingInline: 20,
});

export const sidebarHeaderTitle = style({
  color: 'var(--ant-color-text-description)',
  letterSpacing: '0.1px',
  fontSize: 12,
});
