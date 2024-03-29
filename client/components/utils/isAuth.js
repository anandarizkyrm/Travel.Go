
import { useRouter } from "next/router";


const withAuth = ( WrappedComponent ) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("userInfo");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
         Router.replace("/login");
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;