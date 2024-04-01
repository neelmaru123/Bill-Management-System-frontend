import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the CSS
import Path from './routes'
function App() {
  // const location = useLocation();

  // useEffect(() => {
  //   // Start the progress bar when the location changes
  //   NProgress.start();

  //   return () => {
  //     // Stop the progress bar when the component unmounts
  //     NProgress.done();
  //   };
  // }, [location]);

  return <Path />;
}

export default App;