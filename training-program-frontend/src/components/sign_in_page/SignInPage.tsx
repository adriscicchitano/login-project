import React from "react";
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
} from 'formik';
import classes from './styles.module.scss'

interface Values {
  email: string;
  password: string;
}

export default function SignInPage(){
  return (
    <div className={classes.signInContainer}>
      <h1 className={classes.title}>Member Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className={classes.fieldsContainer}>
          <Field
            id="email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <Field id="password" name="password" placeholder="Password" type="password" />
          <button type="submit" className={classes.signInButton}>Sign In</button>
        </Form>

      </Formik>
      <a className={classes.signUpLink} href="/auth/signup">Don't you have an account?</a>

    </div>
  );
};