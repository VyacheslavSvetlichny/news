import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { INewsItem, INewsState } from "../../models/news";

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (pageNum: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${(pageNum - 1) * 10}`);

            if (!response.ok) {
                throw new Error('Ошибка загрузки новостей');
            }

            const data = await response.json();

            return data.posts.map((post: INewsItem) => ({
                id: post.id,
                title: post.title,
                body: post.body,
                tags: post.tags,
                reactions: {
                    likes: post.reactions?.likes || 0,
                    dislikes: post.reactions?.dislikes || 0
                },
                views: post.views || 0,
                userId: post.userId,
            }));
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
        }
    }
);

const initialState: INewsState = {
    newsList: [],
    favorites: [],
    loading: false,
    hasMore: true,
    currentPage: 1,
    error: null
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const newsId = action.payload;
            const index = state.favorites.indexOf(newsId);

            if (index === -1) {
                state.favorites.push(newsId);
            } else {
                state.favorites.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;

                if (state.currentPage === 1) {
                    state.newsList = action.payload;
                } else {
                    state.newsList = [...state.newsList, ...action.payload];
                }

                state.hasMore = action.payload.length === 10;
                state.currentPage += 1;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    toggleFavorite,
} = newsSlice.actions;

export default newsSlice.reducer;