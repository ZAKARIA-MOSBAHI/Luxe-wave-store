import { DashboardLayout } from "../components/layout/DashboardLayout";
import CartManager from "../components/cart/CartManager";

const Carts = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Cart Management</h1>
        </div>
        <CartManager />
      </div>
    </DashboardLayout>
  );
};

export default Carts;
