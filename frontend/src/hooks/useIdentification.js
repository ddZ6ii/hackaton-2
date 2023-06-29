import { useContext } from 'react';
import { UserContext } from '../contexts/userContex';

export const useIdentification = () => useContext(UserContext);
