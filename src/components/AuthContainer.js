import React from "react";


export const AuthContainer = (props) => {
    return (
      <div className="authcontainer">
        <h1>Chaters</h1>
        <div className="cardcontainer">        
          {props.children}
        </div>
      </div>
    );
  }

export default AuthContainer;