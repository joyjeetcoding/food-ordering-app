import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderwithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CIENT_ID;
  const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URI;
  const audience = import.meta.env.VITE_API_AUDIENCE;

  if (!domain || !clientId || !redirectURI || !audience) {
    throw new Error("Unable to initalize auth");
  }

  const onRedirectCallback = () => {
    navigate("/auth-callback")
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectURI,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderwithNavigate;
