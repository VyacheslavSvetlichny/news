import {Card, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {useAppSelector} from "../store/reduxHooks.ts";

export const Menu = () => {
    const { favorites } = useAppSelector((state) => state.news);

    return (
        <Card
            style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                marginBottom: '24px'
            }}
        >
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Link
                        to={'/news'}
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            backgroundColor: location.pathname === '/news' ? '#1890ff' : 'transparent',
                            color: location.pathname === '/news' ? '#fff' : '#1890ff',
                            border: '2px solid #1890ff',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            minWidth: '160px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            if (location.pathname !== '/news') {
                                e.currentTarget.style.backgroundColor = '#e6f7ff';
                                e.currentTarget.style.color = '#1890ff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (location.pathname !== '/news') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#1890ff';
                            }
                        }}
                    >
                        Последние новости
                    </Link>
                </Col>
                <Col>
                    <Link
                        to={'/favorites'}
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            backgroundColor: location.pathname === '/favorites' ? '#ff4d4f' : 'transparent',
                            color: location.pathname === '/favorites' ? '#fff' : '#ff4d4f',
                            border: '2px solid #ff4d4f',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            minWidth: '160px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            if (location.pathname !== '/favorites') {
                                e.currentTarget.style.backgroundColor = '#fff2f0';
                                e.currentTarget.style.color = '#ff4d4f';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (location.pathname !== '/favorites') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ff4d4f';
                            }
                        }}
                    >
                        Избранные новости ({favorites.length})
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};