import { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const useLastUpdated = () => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const triggerUpdate = useCallback(async () => {
    try {
      // Placeholder for Google Sheets sync logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastUpdated(format(new Date(), "d 'de' MMMM yyyy, HH:mm", { locale: es }));
    } catch (error) {
      console.error('Error updating data', error);
    }
  }, []);

  return { lastUpdated, triggerUpdate };
};
