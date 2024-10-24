import { useContext, useState } from "react";
import styles from "./Modal.module.css";
import { ContextCreator } from "./store";
import {createPortal} from "react-dom"

export default function Modal({ recipe, click, type }) {
  const { name } = useContext(ContextCreator);
  const [msg, setMsg] = useState();

  async function handleWishList() {
    let res = await fetch("http://localhost:8000/addtowishlist", {
      method: "POST",
      body: JSON.stringify({
        useremail: name.useremail,
        type: type,
        additem: recipe.recipe.uri.split("recipe_")[1],
      }),
      headers: { "Content-type": "application/json" },
    });
    const resData = await res.json();
    setMsg(resData);
  }

  if (msg && msg.color === "grey") {
    window.location.reload();
  }

  return createPortal(
    <>
    <div className={styles.div}>
      <button id={styles.close} style={{ cursor: "pointer" }} onClick={click}>
        &times;
      </button>
      <i>{recipe.recipe.label}</i>
      <h2>Ingredients:</h2>
      {recipe.recipe.ingredientLines.map((each, i) => (
        <li key={i}>{each}</li>
      ))}
      {msg && <p style={{ color: msg.color }}>{msg.data}</p>}
      <button
        style={{
          marginTop: "10px",
          backgroundColor: type === "search" ? "#003366" : "red",
        }}
        onClick={() => handleWishList(recipe)}
        disabled={msg}
      >
        {type === "search" ? "Add to WishList" : "Remove from WishList"}
      </button>
    </div>
  </>,document.getElementById("modal")
  )
}
