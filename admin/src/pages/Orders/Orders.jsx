import Navbar from "../../components/Navbar/Navbar";
import AdminOrdersView from "../../components/DashboardPage/AdminOrdersView";

const Orders = () => (
  <div>
    <Navbar />
    <AdminOrdersView showSummary={false} />
  </div>
);

export default Orders;
