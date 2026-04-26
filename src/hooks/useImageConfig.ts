import { useState, useEffect } from 'react';
import { imageConfig, fetchImageConfig } from '../config/images';

export const useImageConfig = () => {
  const [config, setConfig] = useState(imageConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const newConfig = await fetchImageConfig();
        setConfig(newConfig);
      } catch (error) {
        console.error('Failed to load image config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { config, loading };
};

export default useImageConfig;
