import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { mockAPI } from '../../services/mockData';
import { products as mockProducts } from '../../services/mockData';

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

// Simulated API call to fetch products
export const fetchProductsSimulated = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = [...mockProducts];
      
      // Apply filters if provided
      if (params.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === params.category.toLowerCase()
        );
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.minPrice) {
        filteredProducts = filteredProducts.filter(product => 
          product.price >= params.minPrice
        );
      }
      
      if (params.maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
          product.price <= params.maxPrice
        );
      }
      
      if (params.limit) {
        filteredProducts = filteredProducts.slice(0, params.limit);
      }
      
      return filteredProducts;
    } catch (error) {
      return rejectWithValue('Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.');
    }
  }
);

// Thêm hàm tìm kiếm sản phẩm
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const searchResults = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return searchResults;
    } catch (error) {
      return rejectWithValue('Có lỗi xảy ra khi tìm kiếm sản phẩm. Vui lòng thử lại sau.');
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
  filteredProducts: [],
  searchResults: [],
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
    filterProducts: (state, action) => {
      const { category, minPrice, maxPrice } = action.payload;
      let filtered = [...state.products];
      
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }
      
      if (minPrice !== undefined) {
        filtered = filtered.filter(product => product.price >= minPrice);
      }
      
      if (maxPrice !== undefined) {
        filtered = filtered.filter(product => product.price <= maxPrice);
      }
      
      state.filteredProducts = filtered;
    },
    sortProducts: (state, action) => {
      const { sortBy } = action.payload;
      let sorted = [...state.filteredProducts.length > 0 ? state.filteredProducts : state.products];
      
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
      
      state.filteredProducts = sorted;
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
        state.filteredProducts = [];
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
      })
      
      // Fetch Products Simulated
      .addCase(fetchProductsSimulated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsSimulated.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = [];
      })
      .addCase(fetchProductsSimulated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách sản phẩm';
      })
      
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tìm kiếm sản phẩm';
      });
  },
});

export const { clearProductError, clearCurrentProduct, clearAiSuggestions, filterProducts, sortProducts } = productSlice.actions;
export default productSlice.reducer; 