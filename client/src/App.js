import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "react-jss";

import client from "./apollo";
import TeamStatsOverview from "./routes/TeamStatsOverview";
import theme from "./theme";
import Layout from "./containers/Layout";

const App = props => {
  return (
    <Router>
      <Switch>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Route path="/overview/:teamId" component={TeamStatsOverview} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </Switch>
    </Router>
  );
};

export default App;
