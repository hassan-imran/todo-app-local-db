import { useSelector, useDispatch } from "react-redux";
import Login from "./routes/Login";
import { updateAuth } from "./store/auth";


import ErrorPage from "./routes/ErrorPage";
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';


function App() {

  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      
      {/* Conditional rendering the route */}

      {auth ? (<>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">User Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <NavDropdown title={`Signed in as: ${auth.userName}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={() => dispatch(updateAuth(false))}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <br />

        <Routes>
          <Route path="/dashboard" element={
            <Dashboard />
          } />
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/login"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/signup"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>) : (<>
        <Navbar bg="dark" variant="dark">
          <Container>


            <Navbar.Brand>
              <Link to="/"  className="text-reset text-decoration-none">
                User Portal
              </Link>
            </Navbar.Brand>

            <Nav className="me-auto">

              <Nav.Link>
                <Link to="/login" className="text-reset text-decoration-none">
                  Login
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/signup" className="text-reset text-decoration-none">
                  Sign up
                </Link>
              </Nav.Link>

            </Nav>


          </Container>
        </Navbar>

        <br />

        <Routes>
          <Route path="/" element={
            <Login />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/signup" element={
            <SignUp />
          } />
          <Route
            path="/dashboard"
            element={<Navigate to="/login" replace />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>)}

    </div>
  );
}

export default App;
