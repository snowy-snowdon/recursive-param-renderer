import {
  Box,
  colors,
  Container,
  CssBaseline,
  Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from "react-router-dom";

const PARAMS = [
  {
    id: "process",
    name: "Process",
    values: ["details", "associations", "comments", "tasks", "attacments"]
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
    values: ["process", "tasks", "associations"]
  }
];

const find = (id: any) => {
  return PARAMS.find((p) => p.id === id);
};

const findIndex = (id: any) => {
  return PARAMS.findIndex((p) => p.id === id);
};

var randomColor =
  "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

const Entity = () => {
  let { url } = useRouteMatch();
  let { id } = useParams<any>();
  let history = useHistory();
  let entity: any = find(id);
  let randomColor =
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

  return entity?.values?.length ? (
    <Paper
      style={{
        flexGrow: 1,
        width: "99%",
        backgroundColor: randomColor
      }}
    >
      <div>
        <Tabs
          value={id}
          onChange={(value: any) => console.log(value)}
          indicatorColor="primary"
          textColor="primary"
          style={{
            backgroundColor: randomColor
          }}
        >
          <ul>
            <h4>{entity?.name} Tabs</h4>
            {entity?.values?.map((value: any, index: number) => (
              <Tab
                label={value}
                onChange={() => history.replace(`${url}/${value}`)}
                selected={`${history.location.pathname}` === `${url}/${value}`}
                style={{
                  backgroundColor: randomColor
                }}
              />
            ))}
          </ul>
        </Tabs>
        <Switch>
          <Route path={`${url}/:id`}>
            <Entity />
          </Route>
        </Switch>
      </div>
    </Paper>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "25%" }}
        >
          <p>
            <b>{String(id).toUpperCase()}</b>
          </p>
          <p>{url}</p>
        </Typography>
      </Container>
    </React.Fragment>
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
