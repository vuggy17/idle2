import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: '100%',
  borderRadius: '5px 0px 0px 5px',
  backgroundColor: 'rgb(245 245 245 / 90%)',
});

export const inner = style({
  paddingInline: 8,
});
