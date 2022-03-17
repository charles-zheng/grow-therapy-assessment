import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import LoadingWrapper from './LoadingWrapper';
import moment from 'moment';
import { calculateTopDays } from '../utils/stats';

const today = moment();
const thirtyDaysAgo = moment().subtract(30, 'days');

const ArticleCard = ({ item }) => {
  const [summaryLoadingStatus, setSummaryLoadingStatus] = useState('uninitialized');
  const [statsLoadingStatus, setStatsLoadingStatus] = useState('uninitialized');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (detailsOpen && !summary) {
      setSummaryLoadingStatus('pending');
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${item.article}`)
        .then(response => response.json())
        .then(data => {
          setSummary(data.extract);
          setSummaryLoadingStatus('succeeded');
        })
        .catch(error => {
          setSummaryLoadingStatus('failed');
        });
    }
  }, [detailsOpen, summary]);

  useEffect(() => {
    if (detailsOpen && !stats) {
      setStatsLoadingStatus('pending');
      fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${item.article}/daily/${thirtyDaysAgo.format("YYYYMMDD")}/${today.format("YYYYMMDD")}`)
        .then(response => response.json())
        .then(data => {
          setStats(calculateTopDays(data.items));
          setStatsLoadingStatus('succeeded');
        })
        .catch(error => {
          setStatsLoadingStatus('failed');
          throw error;
        });
    }
  }, [detailsOpen, stats]);

  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardActionArea onClick={() => setDetailsOpen(!detailsOpen)}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            #{item.rank}
            <Typography variant="h6">
              {item.article.replace(/_/g, ' ')}
            </Typography>
            <Typography variant="caption">
              {item.views} views
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Collapse in={detailsOpen}>
        <CardContent>
          <LoadingWrapper loadingStatus={summaryLoadingStatus}>
            <Typography variant="body2">
              {summary}
            </Typography>
          </LoadingWrapper>
          <LoadingWrapper loadingStatus={statsLoadingStatus}>
            {stats && (
              <Container sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Most viewed dates this month
                </Typography>
                <Box sx={{ pr: 2, pl: 2, display: 'flex', justifyContent: 'space-between'}}>
                  {stats.map(stat => (
                    <Stack key={stat.timestamp}>
                      <Typography variant="body2">
                        {moment(stat.timestamp.substring(0, 8)).format("MMM D")}
                      </Typography>
                      <Typography variant="caption">
                        {stat.views} views
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Container>
            )}
          </LoadingWrapper>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArticleCard;
