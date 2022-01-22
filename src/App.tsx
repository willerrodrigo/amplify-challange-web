import { Greetings } from "aws-amplify-react";

import "@aws-amplify/ui/dist/style.css";
import "@aws-amplify/ui-react/styles.css";

import AppRoutes from "./routes";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyles />
      <Greetings />
      <AppRoutes />
    </>
  );
}

export default App;
