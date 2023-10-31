
const Expense = () => {
  return (
<>
<h1 className="text-center">Expense Adding</h1>
    <form className="flex justify-center my-2">
      <input className="border-2 border-slate-950 px-2 mr-2" type="text" placeholder="Enter money"/>
      <input className="border-2 border-slate-950 px-2 mr-2" type="text" placeholder="Description"/>
      <select className="border-2 border-slate-950 px-2 mr-2">
        <option>Food</option>
        <option>Petrol</option>
        <option>Salary</option>
      </select>
      <button className="border-2 border-slate-950 px-2 mr-2 bg-slate-950 text-slate-50 rounded-sm">Add Expense</button>
    </form>


</>
  )
}

export default Expense