import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="text-lg text-gray-700 mb-6">We encountered an issue processing your payment.</p>
      <p className="text-gray-600 mb-4">Please try again later or contact support if the issue persists.</p>
      <button
        onClick={() => {
          navigate("/checkout");
        }} // Option to refresh the page
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
      >
        Retry Payment
      </button>
      <p className="text-sm text-gray-500 mt-4">Or go back to the <a href="/" className="text-blue-500 hover:underline">homepage</a>.</p>
    </div>
  );
};

export default Failure;