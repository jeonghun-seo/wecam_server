import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataFetcher = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios.get(url)
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item,
          avg_ppm: item.avg_ppm.toFixed(3),
          timestamp: new Date(item.timestamp).toLocaleTimeString('ko-KR', { hour12: false })
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10초마다 데이터를 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [url]);

  return { data, loading, error };
};

export default useDataFetcher;
