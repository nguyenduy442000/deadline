import { Link,useLocation } from "react-router-dom";
import "./product.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from"../../firebase"
import {useState}from "react";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import {useSelector}from"react-redux";
import {updateProduct}from"../../redux/apiCalls";
import {useDispatch} from "react-redux"
export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const products =useSelector(state=>state.product.products.find(product =>product._id === productId));
    const [inputs,setInputs]=useState({})
    const [file,setFile]= useState(null)
    const [cat,setCat]= useState([])
    const [size,setSize] = useState([])
  const [color,setColor] = useState([])
    const dispatch = useDispatch()
 
    const handleChange =(e)=>{
       setInputs(prev=>{
           return{...prev,[e.target.name]:e.target.value}
       })
    }
    const handleCat =(e)=>{
        setCat(e.target.value.split(","))
    }
    const handleSize = (e)=>{
        setSize(e.target.value.split(","))
    
    }
    const handleColor = (e)=>{
      setColor(e.target.value.split(","))
    
    }
    const handleClick =(e)=>{
        e.preventDefault();
        const fileName = new Date().getTime() + file.name; //hiện thêm ngày up file
        const storage = getStorage(app);
        const storageRef =ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
    
            default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs,img:downloadURL,categories:cat,size:size,color:color};
          updateProduct(products._id,product,dispatch);
         
        });
      }
    );
   
        
    }


    


    return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
     
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={products.img} alt="" className="productInfoImg" />
                  <span className="productName">{products.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{products._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{products.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title" placeholder={products.title}onChange={handleChange} />
                  <label>Product Description</label>
                  <input type="text"name="desc" placeholder={products.desc}onChange={handleChange} />
                  <label>Price</label>
                  <input type="text" name="price" placeholder={products.price}onChange={handleChange} />
                  <label>Categories</label>
                  <input type="text" name="categories" placeholder={products.categories}onChange={handleCat} />
                  <label>Size</label>
                  <input type="text" name="size" placeholder={products.size}onChange={handleSize} />
                  <label>Color</label>
                  <input type="text" name="color" placeholder={products.color}onChange={handleColor} />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                 
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={products.img} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}}onChange={e=>setFile(e.target.files[0])} />
                  </div>
                  <button onClick={handleClick}className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
