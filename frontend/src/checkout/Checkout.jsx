import { useState } from "react";
import ProductPreviewCard from "../card/ProductPreviewCard";
import { useOrderContext } from "../context/orderContext";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const { order, setOrder } = useOrderContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const addresses = formData;
    const updatedOrder = {
      ...order,
      addresses,
    };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    navigate("/pay-now");
  };
  if(!order){
    return navigate("/");
  }
  return (
    <div className="mt-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 p-5 py-7 border rounded-md shadow-md h-[30.5rem] overflow-y-scroll">
          <ProductPreviewCard />
        </div>

        <div className="w-full lg:w-1/2 border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="address" className="block font-medium">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                  rows="4"
                />
              </div>

              <div>
                <label htmlFor="city" className="block font-medium">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="state" className="block font-medium">
                  State/Province/Region
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="zip" className="block font-medium">
                  Zip / Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 text-white rounded-md"
                >
                  Deliver Here
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
