import { Redirect, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, noAuthRoute, kind, ...rest }) {

  const store = useSelector(store => store)

  const check = useMemo(() => {
    if(kind === 'user'){
        return store.user.auth
    }

    if(kind === 'email'){
        return store.refresh.checkEmail
    }

    if(kind === 'login'){
        return !store.user.auth
    }

  }, [store, kind])



  return (
    <Route
      {...rest}
      render={({ location }) =>
      check ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: noAuthRoute,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}