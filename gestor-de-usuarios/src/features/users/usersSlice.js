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
    try {
      const response = await fetch(
        'https://reqres.in/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({
            username: newUser.username,
            email: newUser.email,
          }),
        }
      );

      const data = await response.json();
      return {
        id: data.id || Date.now(),
        email: newUser.email,
        first_name: newUser.username.split(' ')[0] || newUser.username,
        last_name: newUser.username.split(' ')[1] || '',
        avatar: getRandomAvatar(),
      };
    } catch (error) {
      // Mock: retornar usuario creado porque el endpoint no funciona
      return {
        id: Date.now(),
        email: newUser.email,
        first_name: newUser.username.split(' ')[0] || newUser.username,
        last_name: newUser.username.split(' ')[1] || '',
        avatar: getRandomAvatar(),
      };
    }
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

