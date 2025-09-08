import React from 'react';
import {Row, Col, Typography, Space, Empty, Card} from 'antd';
import { NewsCard } from '../components/NewsCard';
import {useAppSelector} from "../store/reduxHooks.ts";
import {Menu} from "../components/Menu.tsx";

const { Title } = Typography;

export const NewsFavorites: React.FC = () => {
    const { newsList, favorites } = useAppSelector((state) => state.news);

    const favoriteNews = newsList?.filter(item => favorites.includes(item.id)) || [];

    return (
        <div className={'p-6 flex justify-center min-h-screen'}>
            <div style={{
                maxWidth: '800px',
                width: '100%'
            }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1f1f1f' }}>
                        Избранные новости
                    </Title>

                    <Menu />

                    {favoriteNews.length === 0 ? (
                        <Empty description="Нет избранных новостей" />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {favoriteNews.map((item) => (
                                <Col key={item.id} xs={24}>
                                    <Card
                                        style={{
                                            width: '100%',
                                            borderRadius: '14px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                            border: 'none',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                        styles={{
                                            body: {
                                                padding: 0
                                            }
                                        }}
                                        hoverable
                                    >
                                        <NewsCard news={item} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Space>
            </div>
        </div>
    );
};