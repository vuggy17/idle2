import { style } from '@vanilla-extract/css';

export const panel = style({
  // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(50px) saturate(180%)',
  WebkitBackdropFilter: 'blur(50px) saturate(180%)',
  // backgroundColor: 'rgba(255, 255, 255, 0.57)',
  borderRadius: 12,
  border: '1px solid rgba(209, 213, 219, 0.3)',

  height: '90%',
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
});
