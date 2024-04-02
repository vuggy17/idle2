import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavigateHelper() {
  const navigate = useNavigate();

  const jumpToExpired = useCallback(() => navigate('/expired'), [navigate]);

  const jumpToIndex = useCallback(() => navigate('/'), [navigate]);

  return { jumpToExpired, jumpToIndex };
}
