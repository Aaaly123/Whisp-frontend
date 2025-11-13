import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const ReactionButton = ({ feedbackId, initialReaction }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    initialReaction || ""
  );

  const token = localStorage.getItem("token");

  const emojis = ["❤️", "😊", "😮", "🤔", "😐", "😞"];

  const handleEmojiClick = async (emoji) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/feedbacks/my-wall/${feedbackId}/react`,
        { feedbackReaction: emoji },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedReaction(emoji);
      setShowEmojis(false);
    } catch (err) {
      console.error("Error submitting reaction:", err);
    }
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <button
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition mt-4"
        onClick={() => setShowEmojis((prev) => !prev)}
      >
        {selectedReaction || "React"}
      </button>

      {showEmojis && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            gap: "5px",
            marginTop: "5px",
            backgroundColor: "black",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              style={{
                fontSize: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
