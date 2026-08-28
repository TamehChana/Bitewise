import { useEffect, useState } from 'react';

import { useAppStore } from '@/store/useAppStore';

export function useStoreHydration(): boolean {
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated());

  useEffect(() => {
    if (useAppStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubscribe;
  }, []);

  return hydrated;
}
