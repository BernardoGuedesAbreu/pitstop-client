import PropTypes from 'prop-types';
import './driverCard.css'

const DriverCard = ({ drivers, selectedDriver }) => {
  const selectedDriverInfo = drivers.find(
    (driver) => driver.driverId === selectedDriver
  );

  return (
    <div>
      <h2>Driver Card</h2>
      {selectedDriverInfo && (
        <div className='driver-card'>
          <h3>Name: {selectedDriverInfo.givenName} {selectedDriverInfo.familyName}</h3>
          <h3>Nationality: {selectedDriverInfo.nationality}</h3>
          <img src={selectedDriverInfo.url}/>
          {/* Render other driver information */}
        </div>
      )}
    </div>
  );
};

DriverCard.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.shape({
      driverId: PropTypes.string,
      givenName: PropTypes.string,
      familyName: PropTypes.string,
      nationality: PropTypes.string,
      // Add other driver properties
    })
  ).isRequired,
  selectedDriver: PropTypes.string.isRequired
};

export default DriverCard;
