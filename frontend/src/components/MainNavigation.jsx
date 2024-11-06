import { Form, NavLink, useFetcher, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

// The array of entries, 
// entry[0]: url - entry[1]: link title
const navLinks = [
  ['/', 'Home'],
  ['/events', 'Events'],
  ['/newsletter', 'Newsletter'],
]

function MainNavigation() {
  const fetcher = useFetcher()
  const token = useRouteLoaderData('root')

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {
            navLinks.map(li =>
              <li key={li[0]}>
                <NavLink
                  to={li[0]}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }

                >
                  {li[1]}
                </NavLink>
              </li>
            )
          }
          {
            !token && <li>
              <NavLink to='/authen?mode=login'
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }

              >
                Authenticate
              </NavLink>
            </li>
          }

          {
            token && <li>
              <Form action='/logout' method='post'>
                <button>Logout</button>
              </Form>
            </li>
          }
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;