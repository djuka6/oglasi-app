import React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import home from "./components/home";
import login from "./pages/login";
import signup from "./pages/signup";

import postaviOglas from "./pages/postaviOglas";
import store from "./redux/store";
import NavigationBar from "./components/NavigationBar";
import { Provider } from "react-redux";
import oglasSlika from "./components/oglasSlika";
import oglasiKorisnika from "./pages/oglasiKorisnika";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const boje = {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#007bff",
      dark: "#69A4FF",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e8eaf7",
      main: "#e8eaf7",
      dark: "#b22a00",
      contrastText: "#33c9dc",
    },
  },
};

const theme = createMuiTheme(boje);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <HashRouter>
            <NavigationBar />
            <div className="App">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/login" component={login} />

                <Route exact path="/postaviOglas" component={postaviOglas} />
                <Route exact path="/oglasSlika" component={oglasSlika} />
                <Route
                  exact
                  path="/oglasiKorisnika"
                  component={oglasiKorisnika}
                />
              </Switch>
            </div>
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
export default App;
