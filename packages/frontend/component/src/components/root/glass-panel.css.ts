import { style } from '@vanilla-extract/css';

export const panel = style({
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  background: 'rgba(255, 255, 255, 0.2)',
  height: '90%',
  width: '90%',
  borderRadius: 16,

  display: 'flex',
  flexDirection: 'row',
});
