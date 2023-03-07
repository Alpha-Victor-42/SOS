import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const eDITCurrentUserInformationsPATCH = (
  Constants,
  { access_token, adresse, email, nom, prenom }
) =>
  fetch(
    `https://saintnazaire.av42.com/users/me?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({
        first_name: prenom,
        last_name: nom,
        location: adresse,
        email: email,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useEDITCurrentUserInformationsPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      eDITCurrentUserInformationsPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('current_user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('current_user');
        queryClient.invalidateQueries('current_users');
      },
    }
  );
};

export const eDITCurrentUserRolePATCH = (Constants, { access_token, role }) =>
  fetch(
    `https://saintnazaire.av42.com/users/me?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({ role: role }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useEDITCurrentUserRolePATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => eDITCurrentUserRolePATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('current_user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('current_user');
        queryClient.invalidateQueries('current_users');
      },
    }
  );
};

export const gETCurrentLoggedUserGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/users/me?access_token=${
      access_token ?? ''
    }&fields=*.*`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETCurrentLoggedUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['current_user', args],
    () => gETCurrentLoggedUserGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['current_users']),
    }
  );
};

export const FetchGETCurrentLoggedUserGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETCurrentLoggedUserGET(
    { access_token },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchGETCurrentLoggedUser: refetch,
  });
};

export const userLoginEndpointPOST = (
  Constants,
  { signinEmail, signinPassword }
) =>
  fetch(`https://saintnazaire.av42.com/auth/login`, {
    body: JSON.stringify({ email: signinEmail, password: signinPassword }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useUserLoginEndpointPOST = ({ signinEmail, signinPassword }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://saintnazaire.av42.com/auth/login`, {
    body: JSON.stringify({ email: signinEmail, password: signinPassword }),
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

export const FetchUserLoginEndpointPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  signinEmail,
  signinPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://saintnazaire.av42.com/auth/login`, {
    body: JSON.stringify({ email: signinEmail, password: signinPassword }),
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchUserLoginEndpoint: refetch });
};

export const userRegisterEndpointPOST = (
  Constants,
  { access_token, generatedToken, signupEmail, signupPassword }
) =>
  fetch(
    `https://saintnazaire.av42.com/users?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        role: '17b8c0a5-4db5-4a63-a434-cb0e42e1b056',
        token: generatedToken,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useUserRegisterEndpointPOST = ({
  access_token,
  generatedToken,
  signupEmail,
  signupPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://saintnazaire.av42.com/users?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        role: '17b8c0a5-4db5-4a63-a434-cb0e42e1b056',
        token: generatedToken,
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

export const FetchUserRegisterEndpointPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  generatedToken,
  signupEmail,
  signupPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://saintnazaire.av42.com/users?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        role: '17b8c0a5-4db5-4a63-a434-cb0e42e1b056',
        token: generatedToken,
      }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchUserRegisterEndpoint: refetch,
  });
};
