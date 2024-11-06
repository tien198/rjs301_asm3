import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {

  const submit = useSubmit()

  const token = useRouteLoaderData('root')

  function startDeleteHandler(name) {
    const isConfirm = confirm(`Are you sure to delete event ${name}`)
    if (isConfirm) {
      submit(null, { method: 'DELETE' })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {
        token &&
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler.bind(null, event.title)}>Delete</button>
        </menu>
      }
    </article>
  );
}

export default EventItem;
