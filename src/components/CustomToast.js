import { toast } from "react-toastify";

function CustomToast({ title, message }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-500">
      <h1 className="font-bold text-blue-700">{title}</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Call custom toast
toast(<CustomToast title="Success" message="Your order was placed!" />);
