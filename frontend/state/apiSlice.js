import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api' }),
  endpoints: (builder) => ({
    fetchOrderHistory: builder.query({
      query: () => '/pizza/history',
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/pizza/order',
        method: 'POST',
        body: newOrder,
      }),
    }),
  }),
});

export const { useFetchOrderHistoryQuery, useCreateOrderMutation } = apiSlice;
