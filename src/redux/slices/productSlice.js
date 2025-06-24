import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { mockAPI } from '../../services/mockData';

// Thunk actions
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ category = '', search = '', limit = 12, page = 1 }, { rejectWithValue }) => {
    try {
      // Sử dụng mockAPI thay vì axios
      const response = mockAPI.getProducts({ category, search, limit, page });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      // Sử dụng mockAPI thay vì axios
      const response = mockAPI.getProductById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  'product/fetchSimilarProducts',
  async ({ productId, limit = 4 }, { rejectWithValue }) => {
    try {
      // Sử dụng mockAPI thay vì axios
      const response = mockAPI.getSimilarProducts(productId, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchByImage = createAsyncThunk(
  'product/searchByImage',
  async (imageFile, { rejectWithValue }) => {
    try {
      // Sử dụng mockAPI thay vì axios
      const response = mockAPI.searchByImage();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  product: null,
  similarProducts: [],
  aiSuggestedProducts: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.product = null;
    },
    clearAiSuggestions: (state) => {
      state.aiSuggestedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách sản phẩm';
      })
      
      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải thông tin sản phẩm';
      })
      
      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải sản phẩm tương tự';
      })
      
      // Search By Image
      .addCase(searchByImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.aiSuggestedProducts = [];
      })
      .addCase(searchByImage.fulfilled, (state, action) => {
        state.loading = false;
        state.aiSuggestedProducts = action.payload;
      })
      .addCase(searchByImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tìm kiếm bằng hình ảnh';
      });
  },
});

export const { clearProductError, clearCurrentProduct, clearAiSuggestions } = productSlice.actions;
export default productSlice.reducer; 