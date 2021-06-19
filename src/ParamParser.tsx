import React from "react";
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch
} from "react-router-dom";

const PARAMS = [
  { id: 0, name: "One", values: [1, 2, 3] },
  { id: 1, name: "Two", values: [0, 3] },
  { id: 2, name: "Three", values: [0, 1, 3] },
  { id: 3, name: "Four", values: [1, 2] }
];

const find = (id: any) => {
  return PARAMS.find((p) => p.id === id);
};

const Entity = () => {
  let { url } = useRouteMatch();
  let { id } = useParams<any>();
  let entity: any = find(parseInt(id));

  return (
    <div>
      <h3>{entity.name} | Tab</h3>

      <ul>
        {entity?.values.map((value: any) => (
          <li key={value}>
            <Link to={`${url}/${value}`}>{find(value)?.name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${url}/:id`}>
          <Entity />
        </Route>
      </Switch>
    </div>
  );
};

export const EntityDisplay = () => {
  let { url } = useRouteMatch();
  let { id } = useParams<any>();
  let entity: any = find(parseInt(id));

  return (
    <div>
      <h3>{entity.name} Tab</h3>

      <ul>
        {entity?.values.map((value: any) => (
          <li key={value}>
            <Link to={`${url}/${value}`}>{find(value)?.name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${url}/:id`}>
          <Entity />
        </Route>
      </Switch>
    </div>
  );
};

export default function ParamParser() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Entity />
        </Route>
        <Route path="/">
          <Redirect to="/0" />
        </Route>
      </Switch>
    </Router>
  );
}
