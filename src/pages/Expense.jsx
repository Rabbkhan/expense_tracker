import { useState, useEffect } from "react";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState([]);
  const [addrtype, setAddrtype] = useState("");
  const [editExpense, setEditExpense] = useState(null);

  const fetchExpenseData = async () => {
    try {
      const response = await fetch(
        "https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid.json"
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const expenseArray = Object.entries(data).map(([id, expense]) => ({
            id,
            ...expense,
          }));
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
    fetchExpenseData();
  }, []);

  const Formsubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      addrtype: addrtype,
    };

    if (editExpense) {
      // If editExpense is present, update the existing expense on the server
      try {
        const res = await fetch(
          `https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid/${editExpense.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(newExpense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          alert("Successfully updated");
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error while updating data:", error);
      }

      // Reset editExpense after updating
      setEditExpense(null);
    } else {
      // If editExpense is not present, add a new expense on the server
      try {
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
          alert("Successfully added");
        } else {
          console.error("Failed to add data");
        }
      } catch (error) {
        console.error("Error while adding data:", error);
      }
    }

    // Clear the input fields
    setAmount("");
    setDescription("");
    setAddrtype("");

    // Fetch the latest data from the server after submitting
    fetchExpenseData();
  };

  const handleEdit = (selectedExpense) => {
    setEditExpense(selectedExpense);
    setAmount(selectedExpense.amount);
    setDescription(selectedExpense.description);
    setAddrtype(selectedExpense.addrtype);
  };

  const HandleDelete = async (selectedExpense) => {
    try {
      const res = await fetch(
        `https://expensetracker-d8a79-default-rtdb.firebaseio.com/userid/${selectedExpense.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        alert("Successfully Deleted");
        // Fetch the latest data from the server after deleting
        fetchExpenseData();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };


  return (
    <>
      <h1 className="text-2xl font-bold text-center text-pink-700 mb-4">
        Expense Adding
      </h1>

      <form
        className="flex justify-center my-2"
        onSubmit={Formsubmit}
        method="post"
      >
        <div className="flex items-center space-x-7">
          <input
            className="border border-pink-800 px-16 py-2 rounded-md"
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            className="border border-pink-800 px-16 py-2 rounded-md"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="border border-pink-800 px-16 py-2 rounded-md"
            onChange={(e) => setAddrtype(e.target.value)}
            value={addrtype}
            required
          >
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="mobile">Mobile</option>
            <option value="cloths">Cloths</option>
          </select>
          <button className="bg-rose-800 text-white px-3 py-2 rounded-md">
            {editExpense ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>

      <div className="max-h-96 overflow-y-auto">
        <table className="border border-collapse border-pink-800 mt-4 mx-auto">
          <thead className="max-w-7xl">
            <tr className="bg-rose-800 text-white text-center">
              <th className="px-20 py-2 border">Amount</th>
              <th className="px-20 py-2 border">Description</th>
              <th className="px-20 py-2 border">Category</th>
              <th className="px-20 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {expense.map((expenses, index) => (
              <tr key={index} className="text-center">
                <td className="px-20 py-2 border">{expenses.amount}</td>
                <td className="px-20 py-2 whitespace-normal break-words max-w-xs border">
                  {expenses.description}
                </td>
                <td className="px-20 py-2 border">{expenses.addrtype}</td>
                <td className="px-20 py-2 border">
                  <button
                    className="mr-2 text-white bg-gray-700 rounded-full p-2"
                    onClick={() => handleEdit(expenses)}
                  >
                    Edit
                  </button>
                  <button
                    className="mr-2 bg-red-700 text-white rounded-full p-2"
                    onClick={() => HandleDelete(expenses)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Expense;
