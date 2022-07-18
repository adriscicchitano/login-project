import {
  Formik,
  FormikHelpers,
  Form,
  Field,
} from 'formik';
import classes from './styles.module.scss'
import { CREATE_USER } from '../../scripts/signup/signup'
import { useMutation } from "@apollo/client";
import { useState } from 'react';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpPage(){
  const [hasError, setHasError] = useState(false)
  const [closeButtonClicked, setCloseButtonClicked] = useState(false)
  const [createUser, { error, data }] = useMutation(CREATE_USER)
  
  return (
    <div className={classes.signUpContainer}>
      <h1 className={classes.title}>Member Registration</h1>
      <div className={classes.errorBlock} style={{display: !hasError || closeButtonClicked ? "none" : undefined}}>
        <div className={classes.errorTextContainer}>
          <span className={classes.boldError}>Oh snap!</span>
          <span>Something went wrong</span>
        </div>
        <button className={classes.closeButton} onClick={() => {setCloseButtonClicked(true)}}>X</button>
      </div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        onSubmit={
          async (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            try {
              const user = await createUser({
                variables: { 
                  data: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password
                  }
                }
              })
              if(user.data.signup.user){
                console.log(`Succesfully created user \n ${JSON.stringify(user.data.signup.user)}`)
                setHasError(false)
              }
              else{
                console.log(`An error has ocurred: ${user.data.signup.authError}`)
                setHasError(true)
              }
            }catch(e){
              console.log(`${e}`)
              setHasError(true)
              setCloseButtonClicked(false)
            }
            setSubmitting(false);
          }
        }
      >
        <Form className={classes.fieldsContainer}>
          <Field 
            id="firstName" 
            name="firstName"
            placeholder="First Name"
          />
          <Field 
            id="lastName" 
            name="lastName" 
            placeholder="Last Name" 
          />
          <Field
            id="email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <Field 
            id="password" 
            name="password" 
            placeholder="Password" 
            type="password" 
          />
          <button type="submit" className={classes.signUpButton}>Sign Up</button>
        </Form>

      </Formik>
      <a className={classes.signInLink} href="/auth/signin">Do you already have an account?</a>

    </div>
  );
};