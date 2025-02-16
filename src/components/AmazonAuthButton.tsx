// src/components/AmazonAuthButton.tsx
import React, { useState, useEffect } from 'react';
import { getAuthorizationURL, exchangeCodeForTokens } from '@/integrations/amazon/auth';

const AmazonAuthButton: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const url = await getAuthorizationURL();
        setAuthUrl(url);
      } catch (error) {
        console.error('Error getting authorization URL:', error);
      }
    };
    fetchAuthUrl();
  }, []);

  useEffect(() => {
    const handleAuthorizationCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        setIsLoading(true);
        try {
          const tokens = await exchangeCodeForTokens(code);
          if (tokens) {
            console.log('Successfully exchanged code for tokens:', tokens);
            // Optionally, redirect the user or update the UI to indicate successful authentication
          } else {
            console.error('Failed to exchange code for tokens.');
            // Handle token exchange failure
          }
        } catch (error) {
          console.error('Error exchanging code for tokens:', error);
          // Handle token exchange failure
        } finally {
          setIsLoading(false);
          // Remove the code from the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleAuthorizationCode();
  }, []);

  const handleAuthClick = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  if (isLoading) {
    return <div>Authenticating...</div>;
  }

  return (
    <button onClick={handleAuthClick} disabled={!authUrl} className="nebula-button">
      Connect to Amazon
    </button>
  );
};

export default AmazonAuthButton;