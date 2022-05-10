import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { 
  getProductStart,
   getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
     deleteProductFailure,
     
     updateProductSuccess,
     updateProductFailure,
     updateProductStart,
     
     addProductSuccess,
     addProductFailure,
     addProductStart,
  
  } from "./productRedux";
import {publicRequest,userRequest} from "../requestMethods"



export const login = async (dispatch,user)=>{
   dispatch(loginStart());
   try{
       const res =await publicRequest.post("/auth/login",user);
       dispatch(loginSuccess(res.data))
   }catch(err){
       dispatch(loginFailure())
   }


}
 // get
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("/products");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };

  //delete
  export const deleteProduct = async (id,dispatch) => {
    dispatch(deleteProductStart());
    try {
      const res = await userRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  
  //update
  export const updateProduct = async (id, product,dispatch) => {
    dispatch(updateProductStart());
    try {
      const res = await userRequest.put(`/product/${id}`,product);
      dispatch(updateProductSuccess({id,product}));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };



  //add

  export const addProduct = async (product,dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products`,product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
