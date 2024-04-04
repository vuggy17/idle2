import { style } from '@vanilla-extract/css';

export const panel = style({
  backdropFilter: 'blur(50px) saturate(180%)',
  WebkitBackdropFilter: 'blur(50px) saturate(180%)',
  borderRadius: 4,
  overflow: 'hidden',
  border: '1px solid rgba(209, 213, 219, 0.3)',

  height: '90%',
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
});
