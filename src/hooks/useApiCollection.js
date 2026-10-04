import { useMemo } from 'react';
import { articles, corporateMetrics, corporateServices, events, gallery, publications, researchClusters } from '../data/demoContent';

const collections = {
  '/events': events,
  '/gallery': gallery,
  '/articles': articles,
  '/research/clusters': researchClusters,
  '/research/publications': publications,
  '/corporate/services': corporateServices,
  '/corporate/metrics': corporateMetrics,
};

// Kept as a hook to minimize page changes; public collections are local demo content.
export default function useApiCollection(path) {
  const items = useMemo(() => collections[path] || [], [path]);
  return { items, loading: false, error: '' };
}
