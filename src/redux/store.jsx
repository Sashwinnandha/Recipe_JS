import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const validateUser=createAsyncThunk("validate",async ({url,data})=>{
    console.log(data)
    let res=await fetch(url,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify(data)
    })
    return await res.json();
})

let initialUser={};

if(localStorage.getItem('user')){
 initialUser = JSON.parse(localStorage.getItem('user'));
}


export const validateReducer=createSlice({
    name:"validate",
    initialState:{
        data:initialUser,
        isAuth:true,
        loading:false,
        error:false
    },
    reducers:{
        logout(state){
            state.data={name:"",useremail:""}
            state.isAuth=false
            localStorage.setItem("user",JSON.stringify({name:"",useremail:""}))
        },
        handleError(state){
            state.data={name:"",useremail:""}
        },handlePassword(state){
            state.data={data:"Password must be same",color:"red"}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(validateUser.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(validateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
            state.isAuth=true
            if(action.payload.data===true){
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
        }),
        builder.addCase(validateUser.rejected,(state)=>{
            state.error=true
        })
    }
})

export const wishlistCount=createAsyncThunk("wishlist",async (name)=>{
    let res=await fetch(`http://localhost:8000/getwishlist/${name}`)
    let resData=await res.json();
    return await resData.data.length;
})

export const wishlistReducer=createSlice({
    name:"wishlist",
    initialState:{
        count:0
    },
    reducers:{
        handleWishlist(state,action){
            state.count=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(wishlistCount.fulfilled,(state,action)=>{
            state.count=action.payload
        })
    }
})

export const wishlistAction=wishlistReducer.actions;

export const validate=validateReducer.actions;

export const store=configureStore({
    reducer:{validate:validateReducer.reducer,wishlist:wishlistReducer.reducer}
})