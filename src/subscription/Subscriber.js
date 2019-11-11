import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { actions } from './reducer';

const sub = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

function Subscriber() {
  const dispatch = useDispatch();
  const [subscriptionResponse] = useSubscription({ query: sub });
  const { data } = subscriptionResponse;
  //console.log(data);
  useEffect(() => {
    if (!data) return;
    // dispatch to redux
    const { newMeasurement } = data;
    dispatch(actions.newMeasurementReceived(newMeasurement));
  }, [data, dispatch]);
  return null;
}

export default Subscriber;
