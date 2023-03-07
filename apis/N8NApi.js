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

export const fORMATRendezVousPOST = (
  Constants,
  { access_token, date, description, time, title }
) =>
  fetch(
    `https://vienne.av42.com/webhook/53e6bf84-d686-4cf1-8b88-a6b5f75d1c6f`,
    {
      body: JSON.stringify({
        date: date,
        Hours: time,
        Title: title,
        Description: description,
        Token: access_token,
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

export const useFORMATRendezVousPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => fORMATRendezVousPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchFORMATRendezVousPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  date,
  description,
  time,
  title,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useFORMATRendezVousPOST(
    { access_token, date, description, time, title },
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

  return children({ loading, data, error, refetchFORMATRendezVous: refetch });
};

export const gETBerneHitsGET = (
  Constants,
  { access_token, besoin, lat, lng, radius, thematique, topic }
) =>
  fetch(
    `https://vienne.av42.com/webhook/21c2aece-abcb-4848-9eae-07de4d92f676?access_token=${
      access_token ?? ''
    }&besoin=${besoin ?? ''}&lat=${lat ?? ''}&lng=${lng ?? ''}&radius=${
      radius ?? ''
    }&thematique=${thematique ?? ''}&topic=${topic ?? ''}`,
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

export const useGETBerneHitsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['Bernes', args], () => gETBerneHitsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETBerneHitsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  access_token,
  besoin,
  lat,
  lng,
  radius,
  thematique,
  topic,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETBerneHitsGET(
    { access_token, besoin, lat, lng, radius, thematique, topic },
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

  return children({ loading, data, error, refetchGETBerneHits: refetch });
};
