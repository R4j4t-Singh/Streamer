import React, { useEffect } from "react";

function OauthSuccess() {
  useEffect(() => {
    window.opener.postMessage(
      { type: "oauth-success" },
      "http://localhost:5173"
    );
    window.close();
  }, []);
  return <></>;
}

export default OauthSuccess;
