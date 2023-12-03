import { useEffect, useState } from 'react';
import axios from 'axios';
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [username] = useState('trandung2k1');
  const [profile, setProfile] = useState();
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   setLoading(true);
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.github.com/users/${username}`,
  //         { signal }, // Method 1
  //       );

  //       if (response.status === 200) {
  //         setProfile(response.data);
  //         setLoading(false);
  //       } else {
  //         console.error(`HTTP error! Status: ${response.status}`);
  //       }
  //     } catch (error) {
  //       if (!axios.isCancel(error)) {
  //         console.error(error);
  //       }
  //     }
  //   })();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [username]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`,
          { cancelToken: source.token }, // Method 2
        );

        if (response.status === 200) {
          setProfile(response.data);
          setLoading(false);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel();
    };
  }, [username]);

  if (loading) return <h3>Loading ...</h3>;
  return (
    <div>
      <h1>{profile?.login}</h1>
    </div>
  );
};

export default Contact;
