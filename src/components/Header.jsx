import propTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header>
      <div className="text-3xl font-bold text-center my-6">{title}</div>
    </header>
  );
};

Header.defaultProps = {
  title: "To-do List",
};

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
