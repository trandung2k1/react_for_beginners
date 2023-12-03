import { useEffect, useState } from 'react';

const User = () => {
  const [loading, setLoading] = useState(false);
  const [username] = useState('trandung2k1');
  const [profile, setProfile] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          { signal }, // Link the signal
        );

        if (!signal.aborted) {
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
            setLoading(false);
          } else {
            console.error(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error(error);
        }
      }
    })();
    return () => {
      abortController.abort();
      setProfile(undefined);
    };
  }, [username]);

  console.log(profile);
  if (loading) return <h3>Loading ...</h3>;
  return (
    <div>
      <h1>{JSON.stringify(profile?.login)}</h1>
    </div>
  );
};

export default User;
