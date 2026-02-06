import mondaySdk from 'monday-sdk-js';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const monday = mondaySdk();

export const initMondaySDK = () => {
  monday.setApiVersion("2024-01");
  return monday;
};

export const mondayClient = new ApolloClient({
  uri: 'https://api.monday.com/v2',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': import.meta.env.VITE_MONDAY_API_TOKEN,
  },
});

export const getMondayContext = async () => {
  try {
    const context = await monday.get('context');
    return context.data;
  } catch (error) {
    console.log('Not running in Monday.com context', error);
    return null;
  }
};

export const isEmbeddedInMonday = () => {
  return window.location.ancestorOrigins?.length > 0 || 
         window !== window.top;
};