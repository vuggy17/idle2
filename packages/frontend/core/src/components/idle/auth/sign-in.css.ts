import { style } from '@vanilla-extract/css';

export const wrapper = style({
  padding: 8,
  paddingBottom: 40,
});

export const formWrapper = style({
  width: '100%',
});

export const formButtonGroup = style({
  width: '100%',
  justifyContent: 'flex-end',
});

export const subTitle = style({
  fontSize: 20,
  lineHeight: '28px',
});

export const title = style({
  margin: 0,
  fontSize: 22,
  display: 'block',
});
