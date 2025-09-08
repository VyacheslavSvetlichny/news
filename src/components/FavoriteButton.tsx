import {toggleFavorite} from "../store/reducer/news.ts";
import type {INewsItem} from "../models/news.ts";
import {Button, message} from "antd";
import {useAppDispatch, useAppSelector} from "../store/reduxHooks.ts";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useCallback} from "react";

export const FavoriteButton = ({...newsItem}: INewsItem) => {
    const { favorites } = useAppSelector((state) => state.news);
    const dispatch = useAppDispatch();
    const isFavorite = newsItem ? favorites.includes(newsItem.id) : false;
    const [messageApi, contextHolder] = message.useMessage();

    const handleToggleFavorite = useCallback(() => {
        if (newsItem) {
            const wasFavorite = favorites.includes(newsItem.id);
            dispatch(toggleFavorite(newsItem.id));

            if (wasFavorite) {
                messageApi.open({
                    type: 'success',
                    content: 'Новость успешно удалена из избранного',
                });
            } else {
                messageApi.open({
                    type: 'success',
                    content: 'Новость успешно добавлена в избранное',
                });
            }
        }
    }, [newsItem, favorites, dispatch, messageApi]);

    return (
        <>
            {contextHolder}
            <Button
                type={isFavorite ? 'primary' : 'default'}
                danger={isFavorite}
                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleToggleFavorite}
            >
                {isFavorite ? 'В избранном' : 'В избранное'}
            </Button>
        </>
    )
}