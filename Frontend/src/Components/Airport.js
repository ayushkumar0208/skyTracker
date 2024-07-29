import React, { useState } from "react";
import axios from "axios";

function Airport() {
  const [IATA, setIATA] = useState("");
  const [apiData, setApiData] = useState(null);

  const handleInputChange = (event) => {
    setIATA(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous data and errors
    setApiData(null);

    try {
      const response = await axios.get(
        `https://airport-info.p.rapidapi.com/airport?iata=${IATA}`,
        {
          headers: {
            "x-rapidapi-key":
              "b310ede070msh49bdfc98108e06cp161988jsn87b9a3023d9e", // Replace with your actual API key
            "x-rapidapi-host": "airport-info.p.rapidapi.com",
          },
        }
      );

      // Check if the response contains data
      if (response.status === 200 && response.data) {
        setApiData(response.data);
      } else {
        console.log("No data found for the given IATA code.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[100%] bg-tranparent">
      <div className="p-20  flex z-10">
        <div className="w-[60%] justify-center content-center text-left p-10 bg-[#77C3EC] rounded-3xl border-8 border-white shadow-2xl">
          <div className="text-6xl font-semibold text-[#4B0082]">Airport</div>
          <h1 className="text-2xl font-bold mb-4">
            Get Airport Details using IATA Code
          </h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              id="textInput"
              type="text"
              value={IATA}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Enter IATA Code"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Get Details
            </button>
          </form>

          {apiData && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Airport Details:</h2>
              {!apiData.iata && (
                <div className="text-xl">
                  No data found for the given IATA code.
                </div>
              )}
              <div className="text-lg">
                {apiData.iata && apiData.iata.length > 0 && (
                  <div className="mb-2">
                    <b>IATA:</b> {apiData.iata}
                  </div>
                )}
                {apiData.icao && apiData.icao.length > 0 && (
                  <div className="mb-2">
                    <b>ICAO:</b> {apiData.icao}
                  </div>
                )}
                {apiData.name && apiData.name.length > 0 && (
                  <div className="mb-2">
                    <b>Name:</b> {apiData.name}
                  </div>
                )}
                {apiData.location && apiData.location.length > 0 && (
                  <div className="mb-2">
                    <b>Location:</b> {apiData.location}
                  </div>
                )}
                {apiData.city && apiData.city.length > 0 && (
                  <div className="mb-2">
                    <b>City:</b> {apiData.city}
                  </div>
                )}
                {apiData.state && apiData.state.length > 0 && (
                  <div className="mb-2">
                    <b>State:</b> {apiData.state}
                  </div>
                )}
                {apiData.country_iso && apiData.country_iso.length > 0 && (
                  <div className="mb-2">
                    <b>Country ISO:</b> {apiData.country_iso}
                  </div>
                )}
                {apiData.country && apiData.country.length > 0 && (
                  <div className="mb-2">
                    <b>Country:</b> {apiData.country}
                  </div>
                )}
                {apiData.phone && apiData.phone.length > 0 && (
                  <div className="mb-2">
                    <b>Phone:</b> {apiData.phone}
                  </div>
                )}
                {apiData.latitude && (
                  <div className="mb-2">
                    <b>Latitude:</b> {apiData.latitude}
                  </div>
                )}
                {apiData.longitude && (
                  <div className="mb-2">
                    <b>Longitude:</b> {apiData.longitude}
                  </div>
                )}
                {apiData.utc && (
                  <div className="mb-2">
                    <b>UTC:</b> {apiData.utc}
                  </div>
                )}
                {apiData.website && apiData.website.length > 0 && (
                  <div className="mb-2">
                    <b>Website:</b>{" "}
                    <a
                      href={apiData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {apiData.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-[40%]">
          <img src="/plane.jpg" alt="" />
        </div>
      </div>
      <div className="bottom-0 fixed -z-20 opacity-80">
        <img src="/Background.png" alt="" width="100%" />
      </div>
      {/* <div className=" bottom-0" style={{ backgroundImage: "url('/Background.png')" }}></div> */}
    </div>
  );
}

export default Airport;
