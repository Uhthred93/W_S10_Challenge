import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza' }),
  endpoints: (builder) => ({
    fetchOrderHistory: builder.query({
      query: () => '/history',
    }),
    createOrder: builder.mutation({
        query: (newOrder) => ({
         url: '/order',
         method: 'POST',
         body: newOrder,   
        }),
    }),
  }),
});

export const { useFetchOrderHistoryQuery, useCreateOrderMutation } = apiSlice;