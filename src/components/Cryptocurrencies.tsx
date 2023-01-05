import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useState, useEffect } from 'react';

type props = {
	simplified?: boolean;
};

type Coin = {
	uuid: string;
	rank: number;
	name: string;
	iconUrl: string;
	price: number;
	marketCap: number;
	change: number;
};

const Cryptocurrencies = ({ simplified = false }: props) => {
	const count = simplified ? 10 : 100;
	const [searchTerm, setSearchTerm] = useState('');
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);

	useEffect(() => {
		setCryptos(cryptosList?.data?.coins);

		const filteredData = cryptosList?.data?.coins.filter((item: any) =>
			item.name.toLowerCase().includes(searchTerm)
		);

		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <>Loading...</>;

	return (
		<>
			{!simplified ? (
				<div className='search-crypto'>
					<Input
						placeholder='Search Cryptocurrency'
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			) : null}
			<Row
				gutter={[32, 32]}
				className='crypto-card-container'>
				{cryptos?.map((coin: Coin) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className='crypto-card'
						key={coin.uuid}>
						<Link to={`/crypto/${coin.uuid}`}>
							<Card
								title={`${coin.rank}. ${coin.name}`}
								extra={
									<img
										className='crypto-image'
										src={coin.iconUrl}
									/>
								}
								hoverable>
								<p>Price: {millify(coin.price)}</p>
								<p>Market Cap: {millify(coin.marketCap)}</p>
								<p>Daily Change: {millify(coin.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
