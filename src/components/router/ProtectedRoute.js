import React  from 'react';
import { Route, Navigate } from 'react-router-dom'


function ProtectedRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) =>  isAuthenticated === true
        ? <Component {...props} />
        : <Navigate to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

// function ProtectedRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         this.props.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default ProtectedRoute;