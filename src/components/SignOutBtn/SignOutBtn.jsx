import { useNavigate } from "react-router-dom";

const SignOutBtn = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <>
      <button
        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  );
};

export default SignOutBtn;
