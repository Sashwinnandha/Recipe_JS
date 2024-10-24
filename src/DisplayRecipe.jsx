import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContextCreator } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAction } from "./redux/store";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DisplayRecipe({
  recipes,
  search,
  handleModal,
  selectedRecipe,
  recipeList
}) {
  // Use an object to keep track of expanded state for each card
  const [expanded, setExpanded] = React.useState(null);
  const [msg, setMsg] = React.useState({ recipe: null, color: "inherit" });
  const data=useSelector(state=>state.validate.data)

  const [wishlist, setWishlist] = React.useState([]);

  const dispatch=useDispatch();

  const handleExpandClick = (id, each) => {
    handleModal(each);
    setExpanded((prev) => (prev === id ? null : id));
  };

  async function handleWishList(each,isAdded) {
    let res = await fetch("http://localhost:8000/addtowishlist", {
      method: "POST",
      body: JSON.stringify({
        useremail: data.username.useremail,
        type: isAdded,
        additem: each.recipe.uri.split("recipe_")[1],
      }),
      headers: { "Content-type": "application/json" },
    });
    const resData = await res.json();
    setMsg({ recipe: each, color: resData.color });
    setWishlist(resData.listArray)
    dispatch(wishlistAction.handleWishlist(resData.listArray.length))
    recipeList(resData.listArray)
  }

  // if (msg && msg.color === "grey") {
  //   window.location.reload();
  // }

  React.useEffect(() => {
    async function getwishlist() {
      let res = await fetch(
        `http://localhost:8000/getwishlist/${data.username.useremail}`
      );

      let resData = await res.json();

      setWishlist(resData.data);
      dispatch(wishlistAction.handleWishlist(resData.data.length))
    }
    getwishlist();
  },[]);


  return (
    <div style={{ marginTop:"70px"}}>
      <h4 style={{ width: "50%" }}>{`Search results of "${search}"`}</h4>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
      {recipes.map((each, i) => {
        const isExpanded = expanded === each.recipe.label;

        const columnStyle = {
          height: isExpanded ? 'auto' : '300px', // Adjust height based on expanded state
          transition: 'height 0.3s ease', // Smooth transition effect
          overflow: 'hidden', // Hide overflowing content
        };

        const isAdded =wishlist.find(e=>e===each.recipe.uri.split("recipe_")[1])

        return (
          <Card sx={{ width: 400 }} style={{ margin: "20px" }} key={i}>
            <CardMedia
              component="img"
              height="294"
              image={each.recipe.images.THUMBNAIL.url}
              alt="Recipe dish"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" title={search} onClick={() => handleWishList(each,isAdded)}>
                <FavoriteIcon
                  
                  style={isAdded ? { color: "red" } : { color: "" }}
                />
              </IconButton>
            </CardActions>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <h2>{each.recipe.label}</h2>
                <b>Cuisine Type: </b>
                <i>{each.recipe.cuisineType[0]} </i>
                <b>Meal Type: </b>
                <i>{each.recipe.mealType[0]}</i>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={isExpanded}
                onClick={() => handleExpandClick(each.recipe.label, each)}
                aria-expanded={isExpanded}
                aria-label="show more"
                title="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                <h2>Ingredients:</h2>
                {selectedRecipe &&
                  selectedRecipe.recipe.ingredientLines.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
      </div>
    </div>
  );
}
