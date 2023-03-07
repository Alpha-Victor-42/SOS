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

export const cREATERendezVousPOST = (
  Constants,
  { access_token, date, description, label, time }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Users_rendez_vous?access_token=${
      access_token ?? ''
    }`,
    {
      body: JSON.stringify({
        date: date,
        Time: time,
        Title: label,
        Description: description,
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

export const useCREATERendezVousPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => cREATERendezVousPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('rendez-vous', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('rendez-vous');
        queryClient.invalidateQueries('rendez-vous');
      },
    }
  );
};

export const FetchCREATERendezVousPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  date,
  description,
  label,
  time,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCREATERendezVousPOST(
    { access_token, date, description, label, time },
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

  return children({ loading, data, error, refetchCREATERendezVous: refetch });
};

export const cREATEUserObjectifPOST = (
  Constants,
  { access_token, objectif_label, objectif_status }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/users_objectifs/?access_token=${
      access_token ?? ''
    }`,
    {
      body: JSON.stringify({ Label: objectif_label, Status: objectif_status }),
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

export const useCREATEUserObjectifPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => cREATEUserObjectifPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('objectifs', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('objectif');
        queryClient.invalidateQueries('objectifs');
      },
    }
  );
};

export const FetchCREATEUserObjectifPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  objectif_label,
  objectif_status,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCREATEUserObjectifPOST(
    { access_token, objectif_label, objectif_status },
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

  return children({ loading, data, error, refetchCREATEUserObjectif: refetch });
};

export const dELETEContactDELETE = (Constants, { access_token, id }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Contacts/${id ?? ''}?access_token=${
      access_token ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
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

export const useDELETEContactDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => dELETEContactDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('contacts', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('contact');
        queryClient.invalidateQueries('contacts');
      },
    }
  );
};

export const dELETEUserObjectifDELETE = (
  Constants,
  { access_token, objectif_id }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/users_objectifs/${
      objectif_id ?? ''
    }?access_token=${access_token ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
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

export const useDELETEUserObjectifDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => dELETEUserObjectifDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('objectifs', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('objectif');
        queryClient.invalidateQueries('objectifs');
      },
    }
  );
};

export const dELETEUserRendezVousDELETE = (Constants, { access_token, id }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Users_rendez_vous/${
      id ?? ''
    }?access_token=${access_token ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
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

export const useDELETEUserRendezVousDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => dELETEUserRendezVousDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('rendez-vous', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('rendez-vous');
        queryClient.invalidateQueries('rendez-vous');
      },
    }
  );
};

export const gETBesoinsGET = (Constants, { Thematique, access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Besoins/?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Thematique][Label][_eq]=${Thematique ?? ''}`,
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

export const useGETBesoinsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['besoins', args], () => gETBesoinsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETBesoinsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  Thematique,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETBesoinsGET(
    { Thematique, access_token },
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

  return children({ loading, data, error, refetchGETBesoins: refetch });
};

export const gETSousBesoinCategoriesGET = (
  Constants,
  { access_token, sous_besoin }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Categories_de_sous_besoins?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Sous_besoin][Label][_eq]=${sous_besoin ?? ''}`,
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

export const useGETSousBesoinCategoriesGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['categories', args],
    () => gETSousBesoinCategoriesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETSousBesoinCategoriesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  sous_besoin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSousBesoinCategoriesGET(
    { access_token, sous_besoin },
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
    refetchGETSousBesoinCategories: refetch,
  });
};

export const gETAllBesoinsGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Besoins/?access_token=${
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

export const useGETAllBesoinsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['besoins', args], () => gETAllBesoinsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETAllBesoinsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETAllBesoinsGET(
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

  return children({ loading, data, error, refetchGETAllBesoins: refetch });
};

export const gETConseilsGET = (
  Constants,
  { access_token, categorie, sous_besoin }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Conseils?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Categorie][Label][_eq]=${
      categorie ?? ''
    }&filter[Sous_besoin][Label][_eq]=${sous_besoin ?? ''}`,
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

export const useGETConseilsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['Conseils', args], () => gETConseilsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETConseilsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  categorie,
  sous_besoin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETConseilsGET(
    { access_token, categorie, sous_besoin },
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

  return children({ loading, data, error, refetchGETConseils: refetch });
};

export const gETContactsGET = (
  Constants,
  { access_token, current_user_access_token }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Contacts?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[user_created][token][_eq]=${
      current_user_access_token ?? ''
    }`,
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

export const useGETContactsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['contacts', args], () => gETContactsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETContactsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  current_user_access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETContactsGET(
    { access_token, current_user_access_token },
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

  return children({ loading, data, error, refetchGETContacts: refetch });
};

export const gETGenresGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Genres?access_token=${
      access_token ?? ''
    }`,
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

export const useGETGenresGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['genres', args], () => gETGenresGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETGenresGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETGenresGET(
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

  return children({ loading, data, error, refetchGETGenres: refetch });
};

export const gETMoreSearchedBesoinsGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Besoins?access_token=${
      access_token ?? ''
    }&filter[stats][_nnull]=null&limit=5&sort=-stats`,
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

export const useGETMoreSearchedBesoinsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['besoins', args],
    () => gETMoreSearchedBesoinsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETMoreSearchedBesoinsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETMoreSearchedBesoinsGET(
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
    refetchGETMoreSearchedBesoins: refetch,
  });
};

export const gETObjectifsStatusGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/users_objectifs_stats/?access_token=${
      access_token ?? ''
    }`,
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

export const useGETObjectifsStatusGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['objectifs', args],
    () => gETObjectifsStatusGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETObjectifsStatusGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETObjectifsStatusGET(
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

  return children({ loading, data, error, refetchGETObjectifsStatus: refetch });
};

export const gETProfessionnelsGET = (
  Constants,
  { access_token, sous_besoin }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Professionnels?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Sous_besoin][Label][_eq]=${sous_besoin ?? ''}`,
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

export const useGETProfessionnelsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Professionnels', args],
    () => gETProfessionnelsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETProfessionnelsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  sous_besoin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETProfessionnelsGET(
    { access_token, sous_besoin },
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

  return children({ loading, data, error, refetchGETProfessionnels: refetch });
};

export const gETSousBesoinsObjectifsGET = (
  Constants,
  { access_token, categorie, sous_besoin }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Objectifs?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Categorie][Label][_eq]=${
      categorie ?? ''
    }&filter[Sous_besoin][Label][_eq]=${sous_besoin ?? ''}`,
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

export const useGETSousBesoinsObjectifsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['objectifs', args],
    () => gETSousBesoinsObjectifsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETSousBesoinsObjectifsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  categorie,
  sous_besoin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSousBesoinsObjectifsGET(
    { access_token, categorie, sous_besoin },
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
    refetchGETSousBesoinsObjectifs: refetch,
  });
};

export const gETSousBesoinsTutorielsGET = (
  Constants,
  { access_token, categorie, sous_besoin }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Tutoriels?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Categorie][Label][_eq]=${
      categorie ?? ''
    }&filter[Sous_besoin][Label][_eq]=${sous_besoin ?? ''}`,
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

export const useGETSousBesoinsTutorielsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['tutoriels', args],
    () => gETSousBesoinsTutorielsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETSousBesoinsTutorielsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  categorie,
  sous_besoin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSousBesoinsTutorielsGET(
    { access_token, categorie, sous_besoin },
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
    refetchGETSousBesoinsTutoriels: refetch,
  });
};

export const gETSousBesoinsGET = (
  Constants,
  { access_token, besoin_id, genre }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Sous_besoins?access_token=${
      access_token ?? ''
    }&fields=*.*.*&filter[Besoin][id][_eq]=${
      besoin_id ?? ''
    }&filter[Genre][Genres_id][Sexe][_eq]=${genre ?? ''}`,
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

export const useGETSousBesoinsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['besoins', args], () => gETSousBesoinsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETSousBesoinsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  besoin_id,
  genre,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSousBesoinsGET(
    { access_token, besoin_id, genre },
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

  return children({ loading, data, error, refetchGETSousBesoins: refetch });
};

export const gETTemoignagesGET = (Constants, { access_token, besoin_id }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Temoignages?access_token=${
      access_token ?? ''
    }&filter[Besoin][id][_eq]=${besoin_id ?? ''}`,
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

export const useGETTemoignagesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['themoignages', args],
    () => gETTemoignagesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETTemoignagesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  besoin_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETTemoignagesGET(
    { access_token, besoin_id },
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

  return children({ loading, data, error, refetchGETTemoignages: refetch });
};

export const gETThematiquesGET = (Constants, { access_token }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Thematiques?access_token=${
      access_token ?? ''
    }`,
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

export const useGETThematiquesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['thematiques', args],
    () => gETThematiquesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETThematiquesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETThematiquesGET(
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

  return children({ loading, data, error, refetchGETThematiques: refetch });
};

export const gETUserObjectifsGET = (
  Constants,
  { access_token, current_user_access_token, status }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/users_objectifs?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Status][Label][_eq]=${
      status ?? ''
    }&filter[user_created][token][_eq]=${current_user_access_token ?? ''}`,
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

export const useGETUserObjectifsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['objectifs', args],
    () => gETUserObjectifsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETUserObjectifsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  current_user_access_token,
  status,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETUserObjectifsGET(
    { access_token, current_user_access_token, status },
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

  return children({ loading, data, error, refetchGETUserObjectifs: refetch });
};

export const gETUserRendezVousGET = (Constants, { access_token, date }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Users_rendez_vous?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[date]=${date ?? ''}&filter[user_created][token][_eq]=${
      access_token ?? ''
    }&sort=Hour`,
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

export const useGETUserRendezVousGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['rendez-vous', args],
    () => gETUserRendezVousGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETUserRendezVousGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  date,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETUserRendezVousGET(
    { access_token, date },
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

  return children({ loading, data, error, refetchGETUserRendezVous: refetch });
};

export const iNCREMENTBesoinsStatsPATCH = (
  Constants,
  { access_token, id, stat }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Besoins/${id ?? ''}?access_token=${
      access_token ?? ''
    }`,
    {
      body: JSON.stringify({ stats: stat }),
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

export const useINCREMENTBesoinsStatsPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => iNCREMENTBesoinsStatsPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('besoins', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('besoin');
        queryClient.invalidateQueries('besoins');
      },
    }
  );
};

export const pOSTContactPOST = (
  Constants,
  { access_token, adresse, email, nom, telephone, type }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/Contacts?access_token=${
      access_token ?? ''
    }`,
    {
      body: JSON.stringify({
        Nom: nom,
        Type: type,
        Adresse: adresse,
        Email: email,
        Telephone: telephone,
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

export const usePOSTContactPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => pOSTContactPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('contacts', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('contact');
        queryClient.invalidateQueries('contacts');
      },
    }
  );
};

export const FetchPOSTContactPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  adresse,
  email,
  nom,
  telephone,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = usePOSTContactPOST(
    { access_token, adresse, email, nom, telephone, type },
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

  return children({ loading, data, error, refetchPOSTContact: refetch });
};

export const sEARCHBesoinsGET = (Constants, { access_token, query }) =>
  fetch(
    `https://saintnazaire.av42.com/items/Besoins?access_token=${
      access_token ?? ''
    }&fields=*.*&filter[Label][_contains]=${query ?? ''}`,
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

export const useSEARCHBesoinsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['besoins', args], () => sEARCHBesoinsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchSEARCHBesoinsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  query,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSEARCHBesoinsGET(
    { access_token, query },
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

  return children({ loading, data, error, refetchSEARCHBesoins: refetch });
};

export const uPDATEUserObjectifStatusPATCH = (
  Constants,
  { access_token, new_objectif_status, objectif_id }
) =>
  fetch(
    `https://saintnazaire.av42.com/items/users_objectifs/${
      objectif_id ?? ''
    }?access_token=${access_token ?? ''}`,
    {
      body: JSON.stringify({ Status: new_objectif_status }),
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

export const useUPDATEUserObjectifStatusPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      uPDATEUserObjectifStatusPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('objectifs', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('objectif');
        queryClient.invalidateQueries('objectifs');
      },
    }
  );
};
