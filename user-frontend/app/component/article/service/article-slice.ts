import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './article-init';
import { articleSave, findAllArticles, findArticleById } from './article-service';

const articleThunks = [findAllArticles]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handlePending = (state: any) => { }
const handleRejected = (state: any) => { }

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const { pending, rejected } = status;
        builder
            .addCase(findAllArticles.fulfilled, (state: any, { payload }: any) => { state.array = payload })
            .addCase(findArticleById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(articleSave.fulfilled, (state: any, { payload }: any) => { state.message = payload })
    }
})

export const getAllArticles = (state: any) => (state.article.array)
export const getArticleById = (state: any) => (state.article.json)
export const getArticleSave = (state: any) => (state.article.message)

export const { } = articleSlice.actions

export default articleSlice.reducer;