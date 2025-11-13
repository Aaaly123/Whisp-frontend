import ReactionButton from "../ReactionButton/ReactionButton";

const ReceivedFeedback = ({ receivedFeedback }) => {
  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white rounded-2xl shadow-xl p-5 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Sentiment Info */}
      <div className="bg-white/10 border border-white/20 rounded-xl p-3 mb-4 backdrop-blur-md">
        <p className="text-sm text-gray-200">
          <span className="font-semibold text-indigo-300">AI Sentiment:</span>{" "}
          {receivedFeedback?.sentiment_label}
        </p>
        <p className="text-sm mt-1 text-gray-300">
          <span className="font-semibold text-indigo-400">Someone From:</span>{" "}
          {receivedFeedback?.someone_text}
        </p>
      </div>

      {/* Feedback Text */}
      <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md text-gray-100">
        <h4 className="text-lg leading-relaxed italic">
          “{receivedFeedback?.feedback_text}”
        </h4>
        <h4 className="mt-4 text-right text-3xl">
          {receivedFeedback?.feedback_reaction}
        </h4>
      </div>

      {/* Reaction Button */}
      <div className="mt-4 flex justify-end">
        <ReactionButton
          feedbackId={receivedFeedback?.id}
          initialReaction={receivedFeedback?.feedback_reaction}
        />
      </div>
    </div>
  );
};

export default ReceivedFeedback;
