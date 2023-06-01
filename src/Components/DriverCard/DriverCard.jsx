import DriverList from "../DriverList/Drivers";

const DriverCard = ({ selectedDriver }) => {
    return (
      <div>
        <h2>Driver Card</h2>
        <DriverList />
        {selectedDriver && (
          <div>
            <h3>Name: {selectedDriver.name}</h3>
            <h3>Nationality: {selectedDriver.nationality}</h3>
            {/* Other driver information */}
          </div>
        )}
      </div>
    );
  };
  
  export default DriverCard;