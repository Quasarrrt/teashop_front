import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home/Home";
import Signup from "./user/Signup/Signup";
import Signin from "./user/Signin/Signin";
import Cart from "./core/Cart/Cart";
import AdminDashBoard from "./user/AdminDashBoard/AdminDashBoard";
import AddCategory from "./admin/AddCategory/AddCategory";
import ManageCategories from "./admin/ManageCategories/ManageCategories";
import AddProduct from "./admin/AddProduct/AddProduct";
import ManageProducts from "./admin/ManageProducts/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory/UpdateCategory";
import AdminRoute from "./auth/helper/AdminRoutes";
import Catalog from "./core/Catalog/Catalog";
import About from "./core/About/About";
import Contacts from "./core/Contacts/Contacts";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/catalog" exact component={Catalog} />
          <Route path="/cart" exact component={Cart} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashBoard}
          />
          <AdminRoute
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoute
            path="/admin/categories"
            exact
            component={ManageCategories}
          />
          <AdminRoute
            path="/admin/create/product"
            exact
            component={AddProduct}
          />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
          <AdminRoute
            path="/admin/category/update/:categoryId"
            exact
            component={UpdateCategory}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
