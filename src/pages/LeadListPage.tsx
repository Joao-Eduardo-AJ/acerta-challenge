import { useNavigate } from "react-router";

const LeadListPage = () => {
  const navigate = useNavigate();

  const handleNewLead = () => {
    navigate("/leads/new");
  };

  return (
    <div>
      <h1>Lead List</h1>
      <button onClick={handleNewLead}>New Lead</button>
      {/* Here will be the Filters and Leads Table */}
    </div>
  );
};

export default LeadListPage;