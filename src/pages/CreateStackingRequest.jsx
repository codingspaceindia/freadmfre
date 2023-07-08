import React from "react";
import { useState } from "react";
import Title from "../components/Title";

const CreateStackingRequest = () => {
  const [stacking, setStacking] = useState({
    amount: 15,
    proofImageUrl: "",
    refId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStacking({ ...stacking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Title title="ChangeAmount" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      <form onSubmit={handleSubmit} className="bg-white m-5 p-5">
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Free Coin Price</label>
          <input
            type="number"
            className="bg-gray-200 px-4 py-2 rounded focus:border-black"
            name="refId"
            value={stacking.refId}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-600 px-4 py-2 mt-5 rounded"
        >
          {isLoading ? "Loading" : "Change"}
        </button>
      </form>
    </>
  );
};

export default CreateStackingRequest;
