import { useState, useEffect } from "react";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState([]);
  const [addrtype, setAddrtype] = useState([ ]);

  

  const fetchExpenseData = async () => {
    try {
      const response = await fetch(
        "https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid.json"
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const expenseArray = Object.values(data);
          setExpense(expenseArray);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchExpenseData();
  }, []);

  const Formsubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      addrtype: addrtype, 
    };
    console.log(addrtype)
  
    const res = await fetch(
      "https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid.json",
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          description,
          addrtype: newExpense.addrtype,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      alert("Successfully updated");
  
      // Update the local state with the new expense
      setExpense([...expense, newExpense]);
  
      // Clear the input fields
      setAmount("");
      setDescription("");
    }
  };

  return (
    <>
      <h1 className="text-center">Expense Adding</h1>
      {/* ... your input fields and select box ... */}
      <form className="flex justify-center my-2" onSubmit={Formsubmit} method="Post">
        <input
          className="border-2 border-slate-950 px-2 mr-2"
          type="text"
          placeholder="Enter money"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="border-2 border-slate-950 px-2 mr-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border-2 border-slate-950 px-2 mr-2"
          onChange={(e) => setAddrtype(e.target.value)}
        >
          <option>food</option>
          <option>mobile</option>
          <option>cloths</option>
        </select>
        <button className="border-2 border-slate-950 px-2 mr-2 bg-slate-950 text-slate-50 rounded-sm">
          Add Expense
        </button>
      </form>

      <table className="m-auto">
        <thead>
          <tr className="flex justify-center my-2 gap-40">
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((expenses, index) => (
            <tr key={index} className="flex justify-center my-2 gap-40">
              <td>{expenses.amount}</td>
              <td>{expenses.description}</td>
              <td>{expenses.addrtype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Expense;
