// src/hooks/useUsers.ts
import { get } from '@/lib/api/request';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get('/me')
      .then(response => setUsers(response.data))
      .catch(err => {
        console.error(err);
        setError(err.response?.data.message || 'Error fetching users');
      })
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};

export default useUsers;
