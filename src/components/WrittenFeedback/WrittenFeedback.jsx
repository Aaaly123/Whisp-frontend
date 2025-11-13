const WrittenFeedback = ({ writtenFeedback }) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-2xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
      {/* Header Section */}
      <div className="p-3 border-b border-gray-600 bg-white/10 rounded-t-2xl">
        <h4 className="text-sm sm:text-base font-semibold text-blue-400">
          To: {writtenFeedback?.receiver?.name}
        </h4>
        <h4 className="text-xs sm:text-sm text-gray-300">
          Someone From: {writtenFeedback?.someone_text}
        </h4>
      </div>

      {/* Feedback Content */}
      <div className="p-5">
        <blockquote className="italic text-gray-100 text-base sm:text-lg leading-relaxed">
          “{writtenFeedback?.feedback_text}”
        </blockquote>
        {writtenFeedback?.feedback_reaction && (
          <h4 className="mt-6 text-3xl text-right">
            {writtenFeedback.feedback_reaction}
          </h4>
        )}
      </div>
    </div>
  );
};

export default WrittenFeedback;
