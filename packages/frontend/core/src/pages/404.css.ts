import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0',
  textAlign: 'center',
});

export const container = style({
  width: 920,
});

export const title = style({
  fontSize: '56px !important',
  marginBottom: '0px !important',
});

export const gif = style({
  backgroundImage:
    'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
  height: 400,
  backgroundPosition: 'center',
});

export const backBtn = style({
  marginTop: 12,
});
