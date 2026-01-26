import { useState, useEffect } from 'react';
import { dummyData } from '../data/dummyData';

export const useCollection = (collectionName, sortField = 'createdAt') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate network delay for realism (optional, can be 0)
    const timer = setTimeout(() => {
      try {
        const result = dummyData[collectionName] || [];
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error(`Error loading dummy data for ${collectionName}:`, err);
        setError(err);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [collectionName]);

  return { data, loading, error };
};
