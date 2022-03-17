import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArticleCard from './ArticleCard';

const Articles = ({ articles }) => {
  return (
    <Box>
      {articles.map(item => (
        <ArticleCard key={item.article} item={item} />
      ))}
    </Box>
  )
};

export default Articles;
