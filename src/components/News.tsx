import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { configConsumerProps } from 'antd/lib/config-provider';

type props = {
	simplified?: boolean;
};
type News = {
	url: string;
	name: string;
	image: { thumbnail: { contentUrl: string } };
	description: string;
	provider: { image: { thumbnail: { contentUrl: string } }; name: string }[];
	datePublished: Date;
};

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage: string =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified = false }: props) => {
	const { data } = useGetCryptosQuery(100);
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const count = simplified ? 6 : 12;
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory,
		count,
	});

	if (!cryptoNews?.value) return <>Loading...</>;

	return (
		<Row gutter={[24, 24]}>
			{!simplified ? (
				<Col span={24}>
					<Select
						showSearch
						className='select-news'
						placeholder='Select a Crypto'
						optionFilterProp='children'
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}>
						<Option value='Cryptocurrency'>Cryptocurrency</Option>
						{data?.data?.coins.map((coin: any) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			) : null}
			{cryptoNews.value.map((news: News, i: number) => (
				<Col
					xs={24}
					lg={8}
					key={i}>
					<Card
						hoverable
						className='news-card'>
						<a
							href={news.url}
							target='_blank'
							rel='noreferrer'>
							<div className='news-image-container'>
								<Title
									className='news-title'
									level={4}>
									{news.name}
								</Title>
								<img
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt={news.name}
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className='provider-container'>
								<div className=''>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
									/>
									<Text className='provider-name'>
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished).startOf('second').fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
