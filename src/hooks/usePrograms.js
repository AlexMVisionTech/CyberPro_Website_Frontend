import { programs as demoPrograms } from '../data/demoContent';

export async function fetchPrograms() {
  return demoPrograms;
}

export default function usePrograms() {
  return { programs: demoPrograms, loading: false, error: '' };
}
