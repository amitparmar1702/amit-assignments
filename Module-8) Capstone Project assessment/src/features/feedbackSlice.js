import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/feedbacks';

export const fetchFeedbacks = createAsyncThunk('feedback/fetchFeedbacks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addFeedback = createAsyncThunk('feedback/addFeedback', async (feedback) => {
  const response = await axios.post(API_URL, feedback);
  return response.data;
});

export const deleteFeedback = createAsyncThunk('feedback/deleteFeedback', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default feedbackSlice.reducer;
