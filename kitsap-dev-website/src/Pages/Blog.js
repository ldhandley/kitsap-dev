import {Page,LinkCard} from "../Components/Page"
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export function Blog(props){
  return(
    <Page title="Kitsap Dev Blog">
      <LinkCard link="/blog/lets-make-a-point-of-sale-for-a-restaurant">
          <CardMedia
            component="img"
            height="194"
            image="/demo-images/pepperoni-pizza.jpeg"
            alt="Pepperoni Pizza"
          />
        <CardHeader
          title="Let's Make a Point of Sale for a Restaurant"
          subheader="February 8, 2022"

        >
        </CardHeader>
        <CardContent>
          <Stack direction="row" spacing={1}>   
            <Chip label="React.js" color="primary" />
            <Chip label="AWS Lambda" color="success" />
          </Stack>
        </CardContent> 
      </LinkCard>  
    </Page>
  )
}
