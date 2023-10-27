import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
    <div>Welcome to Expense Tracker</div>
    <h1>Your Profile is Incomplete. <Link to="/profile">Complete  now</Link> </h1>
    </>
  )
}

export default Home