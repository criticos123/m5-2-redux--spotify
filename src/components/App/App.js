import React from "react";
import { useDispatch } from "react-redux";
import GlobalStyles from "../GlobalStyles";
import ArtistRoute from "../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const DEFAULT_ARTIST_ID = "2CIMQHirSU0MQqyYHq0eOx";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Redirect from="/" to={`/artists/${DEFAULT_ARTIST_ID}`} />
      </Switch>
    </Router>
  );
};

export default App;
