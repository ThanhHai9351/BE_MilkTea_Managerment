import { Application } from "express";
import addressRoute from "~/features/address/route/address.route";
import cartRoute from "~/features/cart/route/cart.route";
import ingredientItemRoute from "~/features/ingredient/route/ingredientItem.route";
import inventoryRoute from "~/features/inventory/route/inventory.route";
import orderRoute from "~/features/order/route/order.route";
import productRoute from "~/features/product/route/product.route";
import recipeRoute from "~/features/recipe/route/recipe.route";
import endpointRoute from "~/features/role/route/endpoint.route";
import permissionRoute from "~/features/role/route/permission.route";
import roleRoute from "~/features/role/route/role.route";
import userRoleRoute from "~/features/role/route/userRole.route";
import summaryRoute from "~/features/summary/route/summary.route";
import supplyRoute from "~/features/supply/route/supply.route";
import authRoute from "~/features/user/route/auth.route";
import userRoute from "~/features/user/route/user.route";

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/products', productRoute);
  app.use('/api/v1/ingredient-items', ingredientItemRoute);
  app.use('/api/v1/supplies', supplyRoute);
  app.use('/api/v1/inventories', inventoryRoute);
  app.use('/api/v1/recipes', recipeRoute);
  app.use('/api/v1/carts', cartRoute);
  app.use('/api/v1/addresses', addressRoute);
  app.use('/api/v1/orders', orderRoute);
  app.use('/api/v1/endpoints', endpointRoute);
  app.use('/api/v1/roles', roleRoute);
  app.use('/api/v1/user-roles', userRoleRoute);
  app.use('/api/v1/permissions', permissionRoute);
  app.use('/api/v1/summary', summaryRoute);
}

export default appRoutes;