import React from 'react';
import { Button, Menu, Typography, Avatar, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
} from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
	return (
		<div className='nav-container'>
			<div className='logo-container'>
				<Avatar
					src={icon}
					size='large'
				/>
				<Typography.Title
					level={3}
					className='logo'>
					<Link to='/'>Cryptoverse</Link>
				</Typography.Title>
				{/* <Button className='menu-control-container'></Button> */}
			</div>
			<Menu theme='dark'>
				<Menu.Item
					icon={<HomeOutlined />}
					key='home'>
					<Link to='/'>Home</Link>
				</Menu.Item>
				<Menu.Item
					icon={<FundOutlined />}
					key='cryptocurrencies'>
					<Link to='/cryptocurrencies'>Cryptocurrencies</Link>
				</Menu.Item>
				<Menu.Item
					icon={<MoneyCollectOutlined />}
					key='Exchanges'>
					<Link to='/exchanges'>Exchanges</Link>
				</Menu.Item>
				<Menu.Item
					icon={<BulbOutlined />}
					key='News'>
					<Link to='/news'>News</Link>
				</Menu.Item>
			</Menu>
		</div>
	);
};

export default Navbar;
