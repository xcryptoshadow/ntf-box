import { Button, Col, Input, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import Container from '@/components/Layout/Container';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title, Text } = Typography;

const Help: React.FunctionComponent = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const [keys, setKeys] = React.useState('');

  return (
    <>
      <div className="help">
        <Container style={{ margin: '0 auto', textAlign: 'center' }}>
          <Title level={3}>{t('home.help.title')}</Title>
          <p>
            <Text>{t('home.help.desc')}</Text>
          </p>
          <Row>
            <Col lg={{ span: 16 }} style={{ padding: 10 }} xs={{ span: 24 }}>
              <Input
                allowClear
                onChange={(e) => setKeys(e.target.value)}
                placeholder={t('home.help.placeholder')}
                size="large"
                value={keys}
              />
            </Col>
            <Col lg={{ span: 8 }} style={{ padding: 10 }} xs={{ span: 24 }}>
              <Button onClick={() => router.push(`/help?keys=${keys}`)} size="large" type="primary">
                {t('home.help.submit')}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <style jsx>{`
        .help {
          padding: 100px 0;

          background: url(/imgs/home/bg_help.png) no-repeat;
          background-size: cover;
          background-position: center;
        }

        .help :global(.ant-typography) {
          color: #fff;
        }
        p {
          opacity: 0.8;
        }

        .help :global(.ant-btn) {
          width: 100%;
          background-color: #699bff;
        }
      `}</style>
    </>
  );
};

export default Help;
