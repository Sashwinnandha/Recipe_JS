import { Form, json } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./RecipeFinder.module.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import DisplayRecipe from "./DisplayRecipe";
import { Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function RecipeFinder() {
  const [search, setSearch] = useState("");

  const [recipes, setRecipes] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  

  useEffect(() => {
    if (search) {
      async function getRecipes() {
        let res = await fetch(
          `https://api.edamam.com/api/recipes/v2?app_id=d6dd5bf8&app_key=c6243345695a1aacbb80c5e1e5204b05&q=${search}&type=public`
        );

        if (!res.ok) {
          throw json({});
        }

        let resData = await res.json();

        setRecipes(resData.hits);
        console.log(resData.hits);
      }
      getRecipes();
    }
  }, [search]);

  function handleSearch(e) {
    const data = new FormData(e.target);
    setSearch(data.get("search"));
  }

  function handleModal(recipe) {
    setSelectedRecipe(recipe);

  }
  return (
    <>
      <Form id={styles.formsearch} onSubmit={(e) => handleSearch(e)} autoComplete="off">

      <TextField
          id="standard-password-input"
          label="Search your tasty recipe"
          type="text"
          name="search"
          required
          variant="standard"
          sx={{
            width: "300px",
            "& .MuiInputBase-input": {
              color: "white", // Text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInputBase-input::placeholder": {
              color: "lightgrey", // Placeholder color
            },
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid white", // Underline color
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid white", // Hover underline color
            },
          }}
        />
        <Button
            type="submit"
            
            variant="filled"
            color="primary"
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
      </Form>

      {(recipes && recipes.length > 0) ? (
        <div style={{marginTop:"130px" }}>
          <DisplayRecipe
          search={search}
          recipes={recipes}
          handleModal={handleModal}
          selectedRecipe={selectedRecipe}
        />
        </div>
      ):search?(<Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="rectangular" width={310} height={160} />
        <Skeleton variant="rounded" width={310} height={160} />
      </Stack>):" "}

      {/* {isModal && selectedRecipe && (
        <Modal
          recipe={selectedRecipe}
          type="search"
          click={() => setModal(false)}
        />
      )} */}
    </>
  );
}
