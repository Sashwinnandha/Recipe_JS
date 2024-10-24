import { useContext } from "react";
import { ContextCreator } from "./store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { name } = useContext(ContextCreator);
  const navigate = useNavigate();

  const data=useSelector(state=>state.validate.data)

  return (
    <>
      <div id="about" style={{color:"#e6c9a4"}}>
        <span style={{fontSize:"35px",color:"white"}}>Recipe Store</span>, your ultimate destination for discovering and
        sharing delicious recipes! At our store, we offer a diverse collection
        of recipes ranging from classic comfort foods to exotic culinary
        creations. Each recipe is carefully curated to provide you with
        easy-to-follow instructions and high-quality ingredients, ensuring a
        delightful cooking experience.
        <br />
        Explore our extensive recipe database, which includes mouth-watering
        images and detailed nutritional information to help you make informed
        choices. Whether you are a seasoned chef or a beginner in the kitchen,
        you will find recipes tailored to all skill levels and dietary
        preferences.
        <br />
        Our store also features user-friendly tools to save and organize your
        favorite recipes, create shopping lists, and even share your own
        culinary masterpieces with our vibrant community. Join us today and turn
        your kitchen into a hub of culinary creativity with Recipe Store!
      </div>
    </>
  );
}
