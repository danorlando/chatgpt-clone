import { useEffect } from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const { login, isAuthenticated } = useOidc();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Callback", isAuthenticated)
    if (!isAuthenticated) {
      login('/profile');
    } else {
      navigate('/profile');
    }
  }, [isAuthenticated, login, navigate]);

  return <>Authentication...</>;
}