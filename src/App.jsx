import './App.css'

import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './Login'
import Dashboard from './dashboard'
import RecipeFinder from './RecipeFinder'
import RecipeRoot from './RecipeRoot'
import WishList from './WishList'
import { wishlistLoader } from './Wishlist'
import UserDetails, { userLoader } from './UserDetails'

const routes=createBrowserRouter([
  {path:"/",element:<Login/>},
  {path:"/dashboard",element:<RecipeRoot/>,
    children:[
      {path:"",element:<Dashboard/>},
      {path:"findarecipe",element:<RecipeFinder/>},
      {path:"wishlist/:name",element:<WishList/>,loader:wishlistLoader},
      {path:"userDetails/:name",element:<UserDetails/>,loader:userLoader}
    ]
  },
])
function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
