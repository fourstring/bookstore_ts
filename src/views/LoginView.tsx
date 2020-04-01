import React, {useContext, useState} from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  LinearProgress,
  Snackbar,
  Theme,
  Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Field, Form, Formik} from "formik";
import {LoginSchema} from "../utils/validation_schemas/LoginSchema";
import {TextField} from "formik-material-ui";
import {authService} from "../services/AuthService";
import {IAuthRedirectState, IAuthStatus} from "../types/IAuth";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {useHistory, useLocation} from "react-router-dom";
import {Alert} from "../components/Alert";

const useStyles = makeStyles((theme: Theme) => createStyles({
  loginArea: {
    [theme.breakpoints.up("md")]: {
      width: "auto",
      marginTop: 0
    },
    [theme.breakpoints.down("sm")]: {}
  },
  inputs: {
    padding: 12
  },
  inputField: {
    width: "100%"
  },
  actions: {
    padding: 12
  }
}));

export function LoginView() {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext) as UserContextType; // UserContext is provided in App.tsx as an UserContextType object.
  const history = useHistory();
  const location = useLocation<IAuthRedirectState | null>();
  const {from} = location.state || {from: {pathname: '/'}};
  const [loginFailed, setLoginFailed] = useState(false); // For display of login failed snackbar.
  const [userDisabled, setUserDisabled] = useState(false);
  return (
    <>
      <Snackbar open={userDisabled} autoHideDuration={3000} onClose={() => setUserDisabled(false)}>
        <Alert severity={"error"}>
          您的账户已被禁用，请联系管理员！
        </Alert>
      </Snackbar>
      <Snackbar open={loginFailed} autoHideDuration={3000} onClose={() => setLoginFailed(false)}>
        <Alert severity={"error"}>
          用户名或密码错误！
        </Alert>
      </Snackbar>
      <Card className={classes.loginArea}>
        <CardHeader
          title={<Typography variant={"h5"}>
            登陆
          </Typography>}
          subheader={<Typography variant={"body1"}>
            登陆以开启更多功能...
          </Typography>}
        />
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={async (values, formikHelpers) => {
            let resp = await authService.login(values);
            if (resp.status === IAuthStatus.REJECTED) {
              setLoginFailed(true);
            } else {
              if (resp.user?.status === "active") {
                setUser(resp.user);
                history.replace(from.pathname as string);
              } else {
                setUserDisabled(true);
              }
            }
          }}
          validationSchema={LoginSchema}>
          {({submitForm, isSubmitting, resetForm}) => {
            return (
              <Form>
                <CardContent>
                  {isSubmitting && <LinearProgress/>}
                  <Grid container className={classes.inputs} spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        name={"username"}
                        label={"用户名"}
                        variant={"outlined"}
                        component={TextField}
                        className={classes.inputField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name={"password"}
                        label={"密码"}
                        variant={"outlined"}
                        type={"password"}
                        component={TextField}
                        className={classes.inputField}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container justify={"center"} spacing={3} className={classes.actions}>
                    <Grid item>
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={submitForm}
                      >
                        登陆
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant={"outlined"}
                        color={"secondary"}
                        onClick={() => resetForm()}
                      >
                        重置
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}
