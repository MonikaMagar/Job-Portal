import AddJobForm from "../components/AdminDashboard/AddJobForm";
import JobList from "../components/AdminDashboard/JobList";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AddJobForm />
      <hr />
      <JobList />
    </div>
  );
};

export default AdminDashboard;
