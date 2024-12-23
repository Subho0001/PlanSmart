// import Header from "./Header.jsx";
// import Footer from "./Footer.jsx";
// import Food from "./Food.jsx";
// import Button from "./Button.jsx";
import Navbar from "./components/Navbar.jsx"
import Login  from "./components/Login.jsx"
import Payment from "./components/Payment.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./components/Signup.jsx";
import Individual from "./components/Individual.jsx"
import Footer from "./components/Footer.jsx";
import Recommedation from "./components/Recommdation.jsx"
import About from "./components/About.jsx";
import EventCategories from "./components/EventCategories.jsx"
import EventSelectionPage from "./components/EventSelectionPage.jsx"
import EditAddress from "./components/EditAddress.jsx";
import Invoice from "./components/Invoice.jsx";
import CelebrationPage from "./components/CelebrationPage.jsx"
import { UserProvider } from "./UserContext.jsx";
import Vendors from "./components/Vendors.jsx";
import AccountSettings from "./components/AccountSettings.jsx";
import MultipleSelect from "./components/Multipleselect.jsx"
import Review from "./components/Review.jsx";

function App() {

  // function handle(e){
  //   console.log(e);
  // }
  return (
    <>
    {/* <Header/>
    <Food handler={handle}/>
    <Button/>
    <Footer/> */}
   <UserProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CelebrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/recommendation" element={<Recommedation />} />
        <Route path="/about" element={<About />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/eventcategories" element={<EventCategories />} />
        <Route path="/eventselection" element={<EventSelectionPage />} />
        <Route path="/editAddress" element={<EditAddress />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/multipleselect" element={<MultipleSelect />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<AccountSettings />} />
      </Routes>
      <Footer/>
    </Router>
    </UserProvider> 
    </>
  );
}

export default App
