import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function OrderForm(){
  const [response,setResponse] = useState("");
  const [pizzaSize, setPizzaSize] = useState(0);

  function GroupedButtons() {
    const [counter, setCounter] = useState(0);

    let handleIncrement = () => {
      setCounter(count => count + 1);
    };

    let handleDecrement = () => {
      setCounter(count => count - 1);
    };
      const displayCounter = counter > 0;

      return (
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={handleIncrement}>+</Button>
          {displayCounter && <Button disabled>{counter}</Button>}
          {displayCounter && <Button onClick={handleDecrement}>-</Button>}
        </ButtonGroup>
      );
  }

  function MenuItemCard(){
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChange = (event) => {
      setPizzaSize(event.target.value);
    };

    return(
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="menu-item">
            +
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Pepperoni Pizza"
        subheader="Our delicious cheese pizza with pepperoni."
      />
      <CardMedia
        component="img"
        height="194"
        image="/demo-images/pepperoni-pizza.jpeg"
        alt="Pepperoni Pizza"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This pepperoni pizza is perfecto!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pizzaSize}
          label="Size of Pizza"
          onChange={handleChange}
        >
          <MenuItem value={10}>10 inch</MenuItem>
          <MenuItem value={14}>14 inch</MenuItem>
          <MenuItem value={18}>18 inch</MenuItem>
        </Select>
        <GroupedButtons/>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )
  }

  return(
    <>
      <MenuItemCard/>
      <p>CheckoutURL: {response.checkoutURL}</p>
      <button onClick={()=>{ fetch("https://xn7ikhkbbg.execute-api.us-west-1.amazonaws.com/prod/checkouts",
        { method:"POST", 
          body:JSON.stringify({ lineItems: [
            {
              price: 'price_0KK7zr7hDggklt0HELzc4Wq1',
              quantity: 5,
            }
          ]})
        })
          .then((res) => res.json())
          .then((json) => setResponse(json))
      }}>
    Order 5 pizzas</button>
    </>)
}
