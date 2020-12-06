import React from 'react';
import Loader from '../../components/Loader';
import Page from '../../components/Page';
import UnknownError from '../../components/UnknownError';
import statisticsService from '../../services/statisticsService';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import { UserNewPostTop } from '../UserNewPost';
import { getQueryKey } from '../../utils/queryKey';

const useStyles = makeStyles({
  canvasContainer: {
    width: '60%',
    '@media(max-width: 768px)': {
      width: '100%',
      height: 400
    },
    '& canvas': {
      width: '100%'
    }
  }
});

const UserStatistics = () => {
  const { userId } = useParams();
  
  const { isError, isLoading, data } = useQuery(
    getQueryKey.editStatistics(userId), 
    () => statisticsService.getEditPostStatistics({ userId })
  );

  const cls = useStyles();

  if( isError ) return <Page><UnknownError /></Page>;
  if( isLoading ) return <Page><Loader /></Page>;

  const state = data.reduce((state, { timestamp }) => {
    const date = new Date(timestamp * 1000);
    const formatter = Intl.DateTimeFormat([], { year: 'numeric', month: 'numeric', day: 'numeric' });

    const formatted = formatter.format(date);

    const inState = state[formatted];
    state[formatted] = (inState ? inState : 0) + 1;

    return state;
  }, {});

  const chartData = {
    labels: Object.keys(state),
    datasets: [{
      label: 'Edited posts',
      data: Object.values(state),
      backgroundColor: 'orange'
    }]
  }

  return (
    <Page>
      <UserNewPostTop />

      <div className={cls.canvasContainer} >
        <Bar 
          data={chartData}
          options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </Page>
  );
};

export default UserStatistics;
