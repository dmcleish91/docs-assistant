import { useState, useEffect } from 'react';
import { getRandomPlaceholder, type PlaceholderExample } from '@/constants/placeholders';

export const usePlaceholders = () => {
  const [placeholders, setPlaceholders] = useState<PlaceholderExample | null>(null);

  useEffect(() => {
    setPlaceholders(getRandomPlaceholder());
  }, []);

  return placeholders;
};
