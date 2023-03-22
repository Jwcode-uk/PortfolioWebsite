import React from 'react';

const WhiteRoundedSquareCard = (props) => {

    const styles = {
        container: {
          display: 'inline-block',
          transition: 'transform 0.5s',
          transformOrigin: 'center center',
        },
        containerHover: {
          transform: 'scale(1.05)'
        },
      };

      const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.container, ...(hover ? styles.containerHover : {}) }}
    >
      <div className="card">
        <div
          className="card-image-section"
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
        <div className="card-text-section">
          <p className="card-title">{props.title}</p>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WhiteRoundedSquareCard;
