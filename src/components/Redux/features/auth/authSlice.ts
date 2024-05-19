import { auth } from "@/app/(rootLayout)/lib/firebase.config";
import API from "@/components/Services/API";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// const token = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : null;

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

interface IUserState {
  user: string | null;
  isLoading: boolean;
  isError: boolean;
  token: string | null;
  error: string | null;
}

interface ICredential {
  email: string;
  password: string;
  // token: string | null;
  role: string;
}

interface RCredential {
  role: string;
  email: string;
  password: string;
  organizationName?: string;
  hospitalName?: string;
  website: string;
  address: string;
  phone: string;
  name?: string;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  token,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/register",
  async (
    {
      role,
      name,
      organizationName,
      hospitalName,
      email,
      password,
      website,
      address,
      phone,
    }: RCredential,
    { rejectWithValue }
  ) => {
    const isUser = await createUserWithEmailAndPassword(auth, email, password);
    // return data.user.email;
    // console.log(isUser);
    if (isUser) {
      try {
        const { data } = await API.post("/auth/register", {
          role,
          name,
          organizationName,
          hospitalName,
          email,
          password,
          website,
          address,
          phone,
        });
        if (data.success) {
          toast.success(data.message);
          window.location.replace("/login");
        }
        return data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.response);
        }
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async ({ role, email, password }: ICredential, { rejectWithValue }) => {
    const isUser = await signInWithEmailAndPassword(auth, email, password);
    if (isUser.user) {
      try {
        const { data } = await API.post("/auth/login", {
          role,
          email,
          password,
        });
        // console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          toast.success(data.message);
          //   return { user: data.user, token: data.token };
          // return { user: data.user, token: data.token };
        }
        return data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.response);
        }
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }: any) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
);

export const logoutUser = createAsyncThunk("/user/logoutUser", async () => {
  await signOut(auth);
  // return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: string | null; token: string | null }>
    ) => {
      state.user = action.payload.user;
      //   console.log(state.user);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.isLoading = false;
        // state.user = action.payload.user;
        // state.token = action.payload.token;
        // console.log(action.payload);
        if (action.payload) {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          // Handle missing payload (e.g., log an error)
          console.error("Login action missing payload");
        }
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //register user
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        // console.log(action.payload);
      }
    );
    builder.addCase(
      createUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    //current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload.user;
      }
    );
    builder.addCase(
      getCurrentUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(
      logoutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
