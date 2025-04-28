import { useNavigate, useParams } from "react-router";

const LeadFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const handleCancel = () => {
    navigate("/leads");
  };

  return (
    <div>
      <h1>{isEditMode ? "Edit Lead" : "Register Lead"}</h1>
      {/* Here will be the Step 1 (Personal Info) and Step 2 (Contact Info) */}
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default LeadFormPage;