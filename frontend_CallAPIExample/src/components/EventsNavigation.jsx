import { NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

function EventsNavigation() {

  const token = useRouteLoaderData('root')

  const isActiveClass = ({ isActive }) => isActive ? classes['active'] : null
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events" className={isActiveClass} end>All Events</NavLink>
          </li>
          {
            token &&
            <li>
              <NavLink to="/events/new" className={isActiveClass} end>New Event</NavLink>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
