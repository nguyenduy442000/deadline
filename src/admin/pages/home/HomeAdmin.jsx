
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./home.css"
import Topbar from "../../components/topbar/topbar/topbar"
import Sidebar from "../../components/sidebar/sidebar"
import ProductList from "../productList/ProductList"
import Product from "../product/Product"
import NewProduct from "../newProduct/NewProduct"



function HomeAdmin() {

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default HomeAdmin;
