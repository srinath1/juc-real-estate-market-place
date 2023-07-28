import Sidebar from "../../../components/nav/Sidebar";
import Adform from "../../../components/forms/Adform";
export default function RentHouse() {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
      <Sidebar />
      <div className="container mt-2">
        <Adform action="Rent" type="House" />
      </div>
    </div>
  );
}
