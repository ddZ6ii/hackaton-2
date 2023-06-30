import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useAuthentication = () => useContext(UserContext);
