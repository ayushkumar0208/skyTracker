// import logo from './logo.svg';

// import Airport from "./Components/Airport";

import Home from "./Components/Home";
const handleScrollToTrack = () => {
  const element = document.getElementById('track');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  return (
    <div className="App">
      <div className="text-8xl font-nunito  font-[800] text-gray-300 p-5">
        SkyTrack
      </div>
      <div className="">
        <div className="w-full font-nunito text-5xl font-bold flex justify-center">
          Welcome to SkyTrack,
        </div>
        <div className="w-full font-nunito text-4xl font-bold flex justify-center">
          Your ultimate flight tracking companion!
        </div>
        <div className="w-full justify-evenly flex items-center">
          <img src="/travel-5360.gif" alt="" width="35%" />
          <div className="w-[40%]">
            <div className=" font-nunito text-3xl font-semibold">
              Get real-time updates, comprehensive flight details, Our system
              will fetch the latest information to keep you updated throughout
              your journey.
            </div>
            <button className="bg-blue-400 p-4 rounded-md text-white text-xl mt-4" onClick={handleScrollToTrack}>Track Flight</button>
          </div>
        </div>
      </div>
      
      {/* <Airport/> */}
      <Home />
    </div>
  );
}

export default App;
