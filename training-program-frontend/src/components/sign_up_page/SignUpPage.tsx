import React from "react";
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
} from 'formik';
import classes from './styles.module.scss'

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpPage(){
  return (
    <div className={classes.signUpContainer}>
      <h1 className={classes.title}>Member Registration</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
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
          <Field id="firstName" name="firstName" placeholder="First Name" />
          <Field id="lastName" name="lastName" placeholder="Last Name" />
          <Field
            id="email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <Field id="password" name="password" placeholder="Password" type="password" />
          <button type="submit" className={classes.signUpButton}>Sign Up</button>
        </Form>

      </Formik>
      <a className={classes.signInLink} href="/auth/signin">Do you already have an account?</a>

    </div>
  );
};