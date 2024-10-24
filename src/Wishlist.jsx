import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { ContextCreator } from "./store";
import axios from "axios";
import DisplayRecipe from "./DisplayRecipe";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export default function WishList() {
  const loaderData = useLoaderData();
  const [data, setData] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const[recipeList,setRecipeList]=useState([]);

  const[loading,setLoading]=useState(true)

  console.log(loading)

  useEffect(()=>{
    setRecipeList(loaderData)
  },[])


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const requests = recipeList.map((id) =>
        axios.get(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=d6dd5bf8&app_key=c6243345695a1aacbb80c5e1e5204b05`
        )
      );
      const responses = await Promise.all(requests);
      setData(responses.map((response) => response.data));
      setLoading(false)
    };

    fetchData();
  }, [recipeList]);

  function handleModal(recipe) {
    setSelectedRecipe(recipe);

  }

  if(loading){
    return <Stack spacing={1}>
    {/* For variant="text", adjust the height via font-size */}
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    {/* For other variants, adjust the size with `width` and `height` */}
    <Skeleton variant="circular" width={80} height={80} />
    <Skeleton variant="rectangular" width={310} height={160} />
    <Skeleton variant="rounded" width={310} height={160} />
  </Stack>
  }
  
  return (
    <>
      {data&&data.length>0 ? (
        <DisplayRecipe
          recipes={data}
          search="wishlist"
          handleModal={handleModal}
          selectedRecipe={selectedRecipe}
          recipeList={setRecipeList}
        />
      ):(<><h4>{"No recipes are added in wishlist"}</h4><Link to="/dashboard/findarecipe">Go to search recipe</Link></>)}
      {/* {isModal && selectedRecipe && (
        <Modal
          type="wishlist"
          recipe={selectedRecipe}
          click={() => setModal(false)}
        />
      )} */}
    </>
  );
}

export async function wishlistLoader({ request, params }) {
  let res = await fetch(`http://localhost:8000/getwishlist/${params.name}`);

  let resData = await res.json();

  return resData.data;
}
