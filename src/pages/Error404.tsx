import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <section className="l-error-page">
      <h3>
        "We're sorry, but the page you were trying to access cannot be found. It
        may have been moved or deleted. Please check the URL and try again, or
        use the search bar or navigation menu to find what you are looking for.
      </h3>
      <h3>
        If you continue to have trouble, please don't hesitate to contact us for
        assistance.
      </h3>
      <h3>
        Go to{" "}
        <NavLink className="logo" to={"/"}>
          Home page
        </NavLink>
      </h3>
    </section>
  );
};

export default Error404;
