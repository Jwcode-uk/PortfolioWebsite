import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const styles = {
    container: {
      display: 'inline-block',
      transition: 'transform 0.5s',
      transformOrigin: 'center center',
    },
    containerHover: {
      transform: 'scale(1.05)',
    },
  };

  const [hover, setHover] = React.useState(false);
  const { image, title, text } = props;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.container, ...(hover ? styles.containerHover : {}) }}
    >
      <div className="card">
        <div
          className="card-image-section"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="card-text-section">
          <p className="card-title">{title}</p>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Card;
