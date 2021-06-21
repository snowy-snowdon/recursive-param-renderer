import React from "react";
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch,
  NavLink
} from "react-router-dom";

const PARAMS = [
  {
    id: "process",
    name: "Process",
    values: ["details", "associations", "comments", "tasks"]
  },
  {
    id: "associations",
    name: "Associations",
    values: ["plans", "templates", "documents", "combo"]
  },
  {
    id: "tasks",
    name: "Tasks",
    values: ["details", "associations", "external-references"]
  },
  {
    id: "combo",
    name: "Combo",
    values: ["process", "tasks"]
  }
];

const find = (id: any) => {
  return PARAMS.find((p) => p.id === id);
};

const Entity = () => {
  let { url } = useRouteMatch();
  let { id } = useParams<any>();
  let entity: any = find(id);

  return entity?.values?.length ? (
    <div>
      <h4>{entity?.name} Tabs</h4>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          border: "0.1rem solid red"
        }}
      >
        {entity?.values?.map((value: any) => (
          <li key={value} style={{ border: "0.1rem solid black" }}>
            <NavLink
              to={`${url}/${value}`}
              activeStyle={{
                fontWeight: "bold",
                color: "green",
                textDecoration: "none"
              }}
            >
              {value}
            </NavLink>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${url}/:id`}>
          <Entity />
        </Route>
      </Switch>
    </div>
  ) : (
    <div style={{ margin: "2rem", border: "0.3rem solid green" }}>
      <p>
        <b>{String(id).toUpperCase()}</b>
      </p>
      <p>{url}</p>
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
          <Redirect to="/process" />
        </Route>
      </Switch>
    </Router>
  );
}
