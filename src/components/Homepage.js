import React from "react"
import { connect } from "react-redux"

const Homepage = () => (
  <div>
    <div className="home" id="background">
      <div id="homeText">
        <div className="f1" id="textSignedIn">
          <br />
          <span className="b">Lynx</span> allows for supply chain management using the Ethereum blockchain.
          </div>
      </div>
      <div id="homeImg">
        <img role="presentation" src="/assets/bgimg/phone2.png" />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Homepage);
