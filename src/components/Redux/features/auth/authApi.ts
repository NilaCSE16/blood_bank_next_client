import { api } from "@/components/Services/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
    }),

    postNewUser: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bloodbank"],
    }),
  }),
});

export const { usePostNewUserMutation, useGetUsersQuery } = userApi;
