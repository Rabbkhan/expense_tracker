const About = () => {
  return (
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center justify-center h-auto">
          <div className="md:order-2 w-full md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-pink-700 mb-4">About Expense Tracker</h1>
            <p className="text-slate-700 text-lg mb-4">
              Expense Tracker is your financial companion, designed to simplify your money management. We provide you with the tools and insights you need to take control of your finances and achieve your financial goals.
            </p>
            <p className="text-slate-700 text-lg mb-4">
              With Expense Tracker, you can easily create and manage expense records, set budgets, and visualize your financial data. Our intuitive interface and powerful features make it simple to track your spending, make informed financial decisions, and work towards your financial objectives.
            </p>
            <p className="text-slate-700 text-lg">
              We are committed to providing you with a secure, user-friendly experience to help you on your financial journey. Join us today and start your path to financial success.
            </p>
          </div>
          <div className="md:order-1 w-auto md:w-1/3">
            <div className="grid grid-cols-1 gap-8">
              <div className="max-w-md rounded-lg overflow-hidden shadow-lg">
                <img src="https://static.vecteezy.com/system/resources/previews/005/962/006/original/home-repair-expense-tracker-smartphone-interface-template-mobile-renovation-budget-tracking-app-page-black-design-layout-finance-manager-screen-flat-ui-for-application-phone-display-vector.jpg" alt="Expense Tracker" className="w-full" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default About;
