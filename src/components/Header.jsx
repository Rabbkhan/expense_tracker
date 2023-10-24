import Logo from '../assets/expense_tracker.png'
const Header = () => {
  return (
    <div className="bg-white-700 flex justify-between px-20">
        <div className='my-1'><img src={Logo} width={70} alt=""/></div>
        <div className=''>
            <ul className='lg:flex hidden justify-center text-center lg:my-6   '>
                <li className='font-semibold mx-3'>Home</li>
                <li className='font-semibold mx-3'>Products</li>
                <li className='font-semibold mx-3'>About us</li>
                <li className='font-semibold mx-3'>Sign Up</li>
            </ul>
        </div>
        
           </div>
  )
}

export default Header