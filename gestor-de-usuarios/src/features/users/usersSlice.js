import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'reqres-free-v1';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1,
  hasMore: true,
};

const getRandomAvatar = () => {
  const randomNum = Math.floor(Math.random() * 12) + 1;
  return `https://reqres.in/img/faces/${randomNum}-image.jpg`;
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=20`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error('error al obtener usuarios');
    }
    const data = await response.json();
    return { users: data.data, page, totalPages: data.total_pages };
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser) => {
    const response = await fetch(
      'https://reqres.in/api/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          role: newUser.role,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Error al crear usuario');
    }

    const data = await response.json();

    return {
      id: data.id || Date.now(),
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      avatar: getRandomAvatar(),
      role: newUser.role,
    };
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { users, page, totalPages } = action.payload;

        if (page === 1) {
          state.items = users;
        } else {
          state.items = [...state.items, ...users];
        }

        state.currentPage = page;
        state.hasMore = page < totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // POST
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

