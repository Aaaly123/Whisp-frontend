import { useNavigate } from "react-router-dom";

const UserForFeedback = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/writefeedback/${user.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-[1.02] hover:shadow-indigo-500/30 duration-300">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-indigo-400 text-center">
          {user.name}
        </h2>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-200 mb-1">Bio</h4>
        <p className="text-gray-300 text-sm">
          {user.bio || "No bio available."}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="w-full py-2 mt-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition duration-200"
      >
        Select
      </button>
    </div>
  );
};

export default UserForFeedback;
