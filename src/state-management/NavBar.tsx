import { LoginStatus } from "./auth";

const NavBar = () => {
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{10}</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
