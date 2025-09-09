import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Space, Spin, Alert, Card, Input } from 'antd';
import { NewsCard } from '../components/NewsCard';
import { useAppDispatch, useAppSelector } from "../store/reduxHooks.ts";
import { fetchNews } from "../store/reducer/news.ts";
import { Menu } from "../components/Menu.tsx";

const { Title } = Typography;
const { Search } = Input;

export const NewsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { newsList, loading, hasMore, error } = useAppSelector((state) => state.news);
    const [searchTerm, setSearchTerm] = useState('');
    const loader = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>(null);

    useEffect(() => {
        if (newsList.length === 0) {
            dispatch(fetchNews(1));
        }
    }, [dispatch, newsList.length]);

    useEffect(() => {
        if (loading || !hasMore || searchTerm) return;

        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const nextPage = Math.ceil(newsList.length / 10) + 1;
                dispatch(fetchNews(nextPage));
            }
        }, options);

        if (loader.current) {
            observer.current.observe(loader.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore, searchTerm, dispatch, newsList.length]);

    const filteredNews = newsList.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && newsList.length === 0) {
        return (
            <div style={{
                padding: '24px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error && newsList.length === 0) {
        return (
            <div style={{
                padding: '24px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <Alert message={`Ошибка загрузки новостей: ${error}`} type="error" />
                </div>
            </div>
        );
    }

    return (
        <div className={'p-6 flex justify-center min-h-screen'}>
            <div style={{
                maxWidth: '800px',
                width: '100%'
            }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1f1f1f' }}>
                        Новостная лента
                    </Title>

                    <Menu />

                    <div style={{ marginBottom: '32px' }}>
                        <Search
                            placeholder="🔍 Поиск по заголовкам новостей..."
                            allowClear
                            size="large"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                            }}
                        />
                    </div>

                    {searchTerm && (
                        <div style={{ marginBottom: '16px' }}>
                            <Typography.Text type="secondary">
                                Найдено новостей: {filteredNews.length}
                            </Typography.Text>
                        </div>
                    )}

                    <Row gutter={[0, 24]}>
                        {filteredNews.map((item) => (
                            <Col key={item.id} xs={24}>
                                <Card
                                    style={{
                                        width: '100%',
                                        borderRadius: '14px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                        border: 'none',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        cursor: 'default'
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

                        {!searchTerm && hasMore && (
                            <Col xs={24} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                <div ref={loader}>
                                    <Spin size="large" />
                                </div>
                            </Col>
                        )}

                        {!searchTerm && !hasMore && newsList.length > 0 && (
                            <Col xs={24} style={{ textAlign: 'center', padding: '20px' }}>
                                <Typography.Text type="secondary">
                                    Вы просмотрели все новости
                                </Typography.Text>
                            </Col>
                        )}
                    </Row>

                    {searchTerm && filteredNews.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <Typography.Text type="secondary">
                                По запросу "{searchTerm}" ничего не найдено
                            </Typography.Text>
                        </div>
                    )}

                    {error && newsList.length > 0 && (
                        <Col xs={24} style={{ textAlign: 'center', padding: '20px' }}>
                            <Alert message={`Ошибка загрузки: ${error}`} type="error" />
                        </Col>
                    )}
                </Space>
            </div>
        </div>
    );
};