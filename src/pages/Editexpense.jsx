import  { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Editexpense = () => {
  const location = useLocation();
  const expenseData = location.state?.expenseData || {};
  const [updatedAmount, setUpdatedAmount] = useState(expenseData.amount || '');
  const [updatedDescription, setUpdatedDescription] = useState(expenseData.description || '');
  const [updatedAddrtype, setUpdatedAddrtype] = useState(expenseData.addrtype || '');

  const handleUpdateExpense = async () => {
    const res = await fetch(
      `https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid/${expenseData.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          amount: updatedAmount,
          description: updatedDescription,
          addrtype: updatedAddrtype,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      alert("Successfully Updated");
      // Redirect or perform any necessary actions after update
    } else {
      const data = await res.json();
      console.error("Error updating expense: ", data.error);
    }
  };
  
  
  return (
    
    <>


<h1 className="text-2xl font-bold text-center text-pink-700 mb-4">
        Expense Update
      </h1>
      <form className="flex justify-center my-2">
        <div className="flex items-center space-x-7">
          <input
            className="border border-pink-800 px-8 py-2 rounded-md"
            type="text"
            value={updatedAmount}
            onChange={(e)=>setUpdatedAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
          <input
            className="border border-pink-800 px-8 py-2 rounded-md"
            type="text"
            placeholder="Description"
            value={updatedDescription}
            onChange={(e)=>setUpdatedDescription(e.target.value)}
            required
          />
          <input
            className="border border-pink-800 px-8 py-2 rounded-md"
            type="text"
            placeholder="Category"
            value={updatedAddrtype}
            onChange={(e)=>setUpdatedAddrtype(e.target.value)}
            required
          />
          <button className="bg-rose-800 text-white px-3 py-2 rounded-md" onClick={handleUpdateExpense}>
            Update Expense
          </button>
        </div>
      </form>


    </>
  )
}

export default Editexpense