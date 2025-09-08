import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Row, Col, Typography, Space, Spin, Alert, Card, Button, Tag, Divider, Avatar, Tooltip} from 'antd';
import { ArrowLeftOutlined, EyeOutlined, UserOutlined, LikeOutlined, DislikeOutlined} from '@ant-design/icons';

import type { INewsItem } from "../models/news.ts";
import {FavoriteButton} from "../components/FavoriteButton.tsx";
import {Menu} from "../components/Menu.tsx";

const { Title, Text, Paragraph } = Typography;

export const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [newsItem, setNewsItem] = useState<INewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://dummyjson.com/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Новость не найдена');
                }

                const data = await response.json();

                const newsDetail: INewsItem = {
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    tags: data.tags,
                    reactions: {
                        likes: data.reactions?.likes || 0,
                        dislikes: data.reactions?.dislikes || 0
                    },
                    views: data.views || 0,
                    userId: data.userId
                };

                setNewsItem(newsDetail);

            } catch (error) {
                console.error('Ошибка загрузки новости:', error);
                setError('Не удалось загрузить новость');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);



    if (loading) {
        return (
            <div style={{
                padding: '48px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error || !newsItem) {
        return (
            <div style={{
                padding: '48px',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '60vh'
            }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <Alert
                        message={error || "Новость не найдена"}
                        description="Такой Новости не существует или она была удалена."
                        type="error"
                        showIcon
                    />
                    <Button
                        type="primary"
                        onClick={() => navigate('/news')}
                        style={{ marginTop: '16px' }}
                    >
                        Вернуться к списку новостей
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', minHeight: '100vh', background: '#f5f5f5' }}>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <Menu />

                <Card
                    style={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: 'none',
                        marginBottom: '32px'
                    }}
                >
                    <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '24px' }}>
                        <Title level={1} style={{ margin: 0, color: '#1f1f1f', lineHeight: 1.3 }}>
                            {newsItem.title}
                        </Title>

                        <Space size="large" wrap>
                            <Space size="small">
                                <Avatar
                                    size="small"
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: '#1890ff' }}
                                />
                                <Text type="secondary">Пользователь #{newsItem.userId}</Text>
                            </Space>

                            <Space size="small">
                                <EyeOutlined style={{ color: '#999' }} />
                                <Text type="secondary">{newsItem.views} просмотров</Text>
                            </Space>

                            <Tooltip title="Лайки">
                                <Space size="small">
                                    <LikeOutlined style={{ color: '#52c41a' }} />
                                    <span>{newsItem.reactions.likes}</span>
                                </Space>
                            </Tooltip>

                            <Tooltip title="Дизлайки">
                                <Space size="small">
                                    <DislikeOutlined style={{ color: '#ff4d4f' }} />
                                    <span>{newsItem.reactions.dislikes}</span>
                                </Space>
                            </Tooltip>
                        </Space>
                    </Space>

                    <Space wrap style={{ marginBottom: '24px' }}>
                        {newsItem.tags.map((tag, index) => (
                            <Tag key={index} color="blue" style={{ borderRadius: '6px', padding: '4px 8px' }}>
                                #{tag}
                            </Tag>
                        ))}
                    </Space>

                    <Paragraph style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        color: '#2c2c2c',
                        marginBottom: '32px',
                        whiteSpace: 'pre-line'
                    }}>
                        {newsItem.body}
                    </Paragraph>

                    <Divider />

                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col>
                            <Space size="middle">
                                <FavoriteButton {...newsItem} />
                            </Space>
                        </Col>
                    </Row>
                </Card>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <Button
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/news')}
                        size="large"
                    >
                        Вернуться ко всем новостям
                    </Button>
                </div>
            </div>
        </div>
    );
};