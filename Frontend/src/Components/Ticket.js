import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import EmailForm from "./EmailForm";

function Ticket(props) {

  const formatText = (text) => {
    let formatted = text.replace(/_/g, ' ');
    formatted = formatted.replace(/\bAND\b/g, '-');
    formatted = formatted
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  
    if (!formatted.endsWith('.')) {
      formatted += '.';
    }
  
    return formatted;
  };

  const {
    carrierCode,
    flightNumber,
    departureDate,
    departureTime,
    arrivalTime,
    from,
    to,
    delay
  } = props;

  return (
    <div id="ticket" className="w-full flex justify-center items-center">
      <div className="w-[80%] h-800 bg-white rounded-2xl  flex">
        <div className="w-[75%] shadow-2xl rounded-lg">
          <div className="w-full p-5 bg-orange-400 rounded-tl-2xl rounded-tr-2xl text-3xl font-[1500]  font-mono text-white flex items-center">
            <FlightIcon className="text-4xl rotate-90 mr-5" fontSize="lg" />{" "}
            Flight Details
          </div>
          <div className="w-full p-5">
            <div className="w-full flex justify-evenly items-center">
              <div>
                <div className="font-mono text-7xl flex justify-center items-center">{from}</div>
                <div className="font-mono text-3xl flex justify-center items-center">
                  {departureTime.substring(0, 10)}
                </div>
                <div className="font-mono text-3xl flex justify-center items-center">
                  {departureTime.substring(11, 16)}
                </div>
              </div>

              <FlightIcon className="text-7xl rotate-90 " fontSize="lg" />
              <div>
                <div className="font-mono text-7xl flex justify-center items-center">{to}</div>
                <div className="font-mono text-3xl flex justify-center items-center">
                  {arrivalTime.substring(0, 10)}
                </div>
                <div className="font-mono text-3xl flex justify-center items-center">
                  {arrivalTime.substring(11, 16)}
                </div>
              </div>
            </div>
            <div className="w-full text-3xl font-mono flex justify-evenly items-center">
              <p>
                <b>DATE: </b>
                {departureDate}
              </p>
            </div>
          </div>
          <div className="w-full text-3xl font-mono flex justify-center items-center">
            {/* Conditional rendering for delay */}
            <b>Delay Status:</b>{delay ? <p>{formatText(delay.result)}</p> : <p>Flight is OnTime</p>}
          </div>
          <div className="w-full p-7 bg-orange-400 rounded-bl-2xl rounded-br-2xl"></div>
        </div>
        <div
          className="w-[25%] shadow-2xl "
          style={{
            borderLeft: "3px dashed black",
            height: "90%",
            alignItems: "center",
            borderLeftStyle: " dashed",
          }}
        >
          <div className="w-full p-5 bg-orange-400 rounded-tl-2xl rounded-tr-2xl text-3xl font-[1500]  font-mono text-white flex items-center justify-center">
            Notification
          </div>
          <div className="font-mono text-5xl flex justify-center p-5">
            {carrierCode} {flightNumber}
          </div>
          <EmailForm />
          <div className="bottom-0 w-full p-7 bg-orange-400 rounded-bl-2xl rounded-br-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
