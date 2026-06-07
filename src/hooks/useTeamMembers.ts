import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeamMembers = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/team-members/frontend/list', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(data);
        } else {
          setMembers([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch team members:', err);
        setMembers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { members, loading };
};
