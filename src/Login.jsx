import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    window.location.assign(
      "https://ltim-de-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=itke9a465pu2h3c03re23lvu7&response_type=code&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A5173"
    );
  }, []);
  return <div>Login</div>;
};

export default Login;
