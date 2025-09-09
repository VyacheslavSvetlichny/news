import React from 'react';
import { Card, Button, Tag, Space, Tooltip } from 'antd';
import { EyeOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { INewsItem } from "../models/news.ts";
import {FavoriteButton} from "./FavoriteButton.tsx";

interface NewsCardProps {
    news: INewsItem;
    showActions?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, showActions = true }) => {
    const navigate = useNavigate();
    const handleReadMore = () => {
        navigate(`/news/${news.id}`);
    };

    return (
        <Card
            actions={showActions ? [
                <FavoriteButton {...news} />,
                <Button type="text" icon={<EyeOutlined />} onClick={handleReadMore}>
                    Читать
                </Button>,
            ] : undefined}
        >
            <Card.Meta
                title={news.title}
                description={
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div className={'line-clamp-3'}>{news.body}</div>

                        <Space wrap>
                            {news.tags.map((tag, index) => (
                                <Tag key={index} color="blue">
                                    #{tag}
                                </Tag>
                            ))}
                        </Space>

                        <Space size="middle" style={{ marginTop: '8px' }}>
                            <Tooltip title="Лайки">
                                <Space size="small">
                                    <LikeOutlined style={{ color: '#52c41a' }} />
                                    <span>{news.reactions.likes}</span>
                                </Space>
                            </Tooltip>

                            <Tooltip title="Дизлайки">
                                <Space size="small">
                                    <DislikeOutlined style={{ color: '#ff4d4f' }} />
                                    <span>{news.reactions.dislikes}</span>
                                </Space>
                            </Tooltip>

                            <Tooltip title="Просмотры">
                                <Space size="small">
                                    <EyeOutlined />
                                    <span>{news.views}</span>
                                </Space>
                            </Tooltip>

                            <Tag color="default">Автор: {news.userId}</Tag>
                        </Space>
                    </Space>
                }
            />
        </Card>
    );
};