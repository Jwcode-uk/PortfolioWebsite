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
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '0px',
        width: '400px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        transform: 'scale(1)',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundClip: 'border-box',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}>
        </div>
        <div style={{
          flex: 1,
          flexDirection: 'column',
          color: 'black',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          padding: '10px',
          paddingTop: '0px'
        }}>
          <p style={{ textAlign: 'Left',  margin:"0" , fontSize: "2rem"}}>{props.title}</p>
          <p style={{ textAlign: 'Left', margin: '0', fontSize: "1.5rem" }}>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WhiteRoundedSquareCard;
