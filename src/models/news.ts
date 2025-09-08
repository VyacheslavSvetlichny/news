export interface INewsItem {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface NewsState {
    newsList: INewsItem[];
    favorites: number[];
    loading: boolean;
    hasMore: boolean;
    currentPage: number;
    error?: string | null;
    searchTerm?: string;
}