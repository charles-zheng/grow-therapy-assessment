import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Articles from '../components/Articles';
import ArticleFilters from '../components/ArticleFilters';
import LoadingWrapper from '../components/LoadingWrapper';
import moment from 'moment';


const ArticlesContainer = () => {
  const [loadingStatus, setLoadingStatus] = useState('uninitialized');
  const [date, setDate] = useState(moment().subtract(1, 'days'));
  const [limit, setLimit] = useState(100);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setLoadingStatus('pending');
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${date.format("YYYY")}/${date.format("MM")}/${date.format("DD")}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLoadingStatus('succeeded');
        setArticles(data.items[0].articles);
      })
      .catch(error => {
        setLoadingStatus('failed');
      });
  }, [date]);


  return (
    <Container maxWidth="sm">
      <Typography sx={{ mt: 2 }} variant="h5">
        {`Top ${limit} Wikipedia articles - ${date.format("MMMM Do YYYY")}`}
      </Typography>
      <ArticleFilters date={date} onDateChange={setDate} limit={limit} onLimitChange={setLimit} />
      <LoadingWrapper loadingStatus={loadingStatus}>
        <Articles articles={articles.slice(0, limit)} />
      </LoadingWrapper>
    </Container>
  );
};

export default ArticlesContainer;
