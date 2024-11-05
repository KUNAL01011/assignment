import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("order");
    const timer = setTimeout(() => {
      navigate("/"); // Redirect after a delay
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-600 mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-4">Thank you for your purchase!</p>
      <p className="text-gray-500">You will be redirected to the homepage shortly.</p>
      <p className="text-gray-500">If not, click <a href="/" className="text-blue-500 hover:underline">here</a>.</p>
    </div>
  );
};

export default Success;
