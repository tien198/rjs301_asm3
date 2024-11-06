import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';


function AuthForm() {
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'

  const errorsRes = useActionData()
  const errors = errorsRes && errorsRes.errors

  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <Form method="post" className={classes.form}>
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        {errors && errors.email && <span className='text-primary-800'>{errors.email}</span>}
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
        {errors && errors.password && <span className='text-primary-800'>{errors.password}</span>}
        {errors && errors.credentials && <span className='text-primary-800'>{errors.credentials}</span>}
        {errors && errors.message && <span className='text-primary-800'>{errors.message}</span>}
      </p>
      <div className={classes.actions}>
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Create new user' : 'Login'}
        </Link>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting ...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default AuthForm;



class AuthenError {
  constructor(err) {
    this.email = err && err.email && err.email
    this.password = err && err.password && err.password
  }
}

