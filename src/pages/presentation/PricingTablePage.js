import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Card, { CardBody } from '../../components/bootstrap/Card';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import Logo from '../../assets/logos/domusLogoLogin.png';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Spinner from '../../components/bootstrap/Spinner';
import { priceFormat } from '../../helpers/helpers';
import stripeSubscription from '../../stripeSubscription';

/**
 * Style
 */
const useStyles = createUseStyles({
	image: {
		maxHeight: '74px',
		objectFit: 'contain',
	},
});

const PricingTablePage = () => {
	const classes = useStyles();

	const [activePremiumPackage, setctivePremiumPackage] = useState(false);
	const [modalStatus, setModalStatus] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingSimulate, setLoadingSimulate] = useState(false);

	const cardInfo = 4444;
	const condoInfo = {
		name: 'Jupiter',
		cost: 1200,
		houses: 20,
	};

	const onClickPremiumPackage = (e) => {
		e.preventDefault();
		setctivePremiumPackage(!activePremiumPackage);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			clearTimeout(timer);
			setLoading(false);
		}, 2000);
	}, []);

	const simulatePay = () => {
		setLoadingSimulate(true);

		const timer = setTimeout(() => {
			clearTimeout(timer);
			setLoadingSimulate(false);
			setModalStatus(false);
		}, 2000);
	};

	return (
		<PageWrapper>
			<div>
				<div className='col-12 mb-3' style={{ display: 'flex', marginTop: '30px' }}>
					<div style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
						<img
							src={Logo}
							className={classes.image}
							alt=''
							style={{ marginLeft: '60px' }}
						/>
					</div>
					<div
						className='fw-bold'
						style={{
							color: '#4E4A55',
							width: '50%',
							margin: 'auto',
							fontSize: '45px',
							textAlign: 'center',
						}}>
						¡Para tus necesidades administrativas!
					</div>
					<div style={{ width: '25%' }} />
				</div>

				<div style={{ display: 'flex', marginTop: '4%', textAlign: 'center' }}>
					<div
						style={{ margin: 'auto', width: '33%', cursor: 'pointer' }}
						role='presentation'
						onClick={onClickPremiumPackage}>
						<Card
							stretch
							borderColor={activePremiumPackage ? 'info' : null}
							borderSize={activePremiumPackage ? 3 : 0}
							shadow={activePremiumPackage ? 'lg' : null}>
							<CardBody>
								{loading ? (
									<div style={{ textAlign: 'center' }}>
										<Spinner color='info' />
									</div>
								) : (
									<div className='row pt-5 g-4 align-items-center'>
										<div style={{ width: '100px', margin: 'auto' }}>
											<Icon
												icon='Maps Home Work'
												size='5x'
												color='info'
												style={{ margin: 'auto' }}
											/>
										</div>
										<div className='col-12' style={{ textAlign: 'center' }}>
											<h2>{condoInfo.name}</h2>
										</div>
										<div className='col-12' style={{ textAlign: 'center' }}>
											<view
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													alignItems: 'baseline',
													textAlign: 'center',
												}}>
												<text className='display-4 fw-bold'>
													{priceFormat(condoInfo.cost)}
												</text>
												<text className='display-6'>/ mensuales</text>
											</view>
										</div>
										<div
											className='col-12'
											style={{ textAlign: 'center', marginBottom: '30%' }}>
											<div
												style={{
													margin: 'auto',
													width: '80%',
													justifyContent: 'center',
													justifyItems: 'center',
												}}>
												<tbody>
													<tr className='lead' style={{ width: '100%' }}>
														<th style={{ width: '20%' }}>
															<Icon icon='Done' color='success' />
														</th>
														<td style={{ textAlign: 'left' }}>
															{`${condoInfo.houses} casas`}
														</td>
													</tr>
													<tr className='lead'>
														<th style={{ width: '20%' }}>
															<Icon icon='Done' color='success' />
														</th>
														<td style={{ textAlign: 'left' }}>
															Plataforma administrativa
														</td>
													</tr>
													<tr className='lead'>
														<th style={{ width: '20%' }}>
															<Icon icon='Done' color='success' />
														</th>
														<td style={{ textAlign: 'left' }}>
															{`Hasta ${condoInfo.houses} aplicaciones gratis`}
														</td>
													</tr>
												</tbody>
											</div>
										</div>
										<div className='col-12'>
											<Button
												color='info'
												isLight={!activePremiumPackage}
												className='w-100 py-3 text-uppercase'
												size='lg'
												onClick={() => {
													const promesa = stripeSubscription();
													promesa.then((value) => {
														window.open(value.url, '_self')
													})
													
												}}>
												CONTINUAR CON EL PAGO
											</Button>
										</div>
									</div>
								)}
							</CardBody>
						</Card>
					</div>
				</div>
			</div>

			<Modal
				setIsOpen={setModalStatus}
				isOpen={modalStatus}
				size='lg'
				titleId='add-new-card'
				isCentered>
				<ModalHeader setIsOpen={setModalStatus}>
					<ModalTitle id='add-new-card'>Información de pago</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div>
						<div style={{ marginLeft: '24px', marginRight: '24px' }}>
							<div className='col-12'>
								<text style={{ fontSize: '20px' }}>Concepto</text>
							</div>

							<div style={{ borderRadius: '6px', border: '2px solid #4D69FA30' }}>
								<div className='col-12' style={{ display: 'flex' }}>
									<div
										className='col-6'
										style={{ textAlign: 'right', width: '50%' }}>
										<text style={{ fontSize: '20px' }}>Mensualidad</text>
									</div>

									<div
										className='col-3'
										style={{ textAlign: 'right', width: '50%' }}>
										<text
											style={{
												fontSize: '20px',
												fontWeight: '700',
												marginRight: '30px',
											}}>
											{priceFormat(condoInfo !== null ? condoInfo.cost : 0)}
										</text>
									</div>
								</div>
							</div>

							<div className='col-12' style={{ marginTop: '30px' }}>
								<text style={{ fontSize: '20px' }}>Método de pago</text>
							</div>

							<div style={{ borderRadius: '6px', border: '2px solid #4D69FA30' }}>
								<div className='col-12' style={{ display: 'flex' }}>
									<div
										className='col-6'
										style={{ textAlign: 'right', width: '50%' }}>
										<text style={{ fontSize: '20px' }}>Tarjeta</text>
									</div>

									<div
										className='col-6'
										style={{ textAlign: 'right', width: '50%' }}>
										<text
											style={{
												fontSize: '20px',
												fontWeight: '700',
												marginRight: '30px',
											}}>
											{`**** **** **** ${cardInfo}`}
										</text>
									</div>
								</div>
							</div>

							<div className='col-12' style={{ marginTop: '10%' }}>
								<div style={{ width: '120px', margin: 'auto' }}>
									{loadingSimulate ? (
										<div style={{ textAlign: 'center' }}>
											<Spinner color='info' />
										</div>
									) : (
										<Button
											color='info'
											isLight
											className='w-100 py-3 text-uppercase'
											size='lg'
											onClick={() => {
												simulatePay();
											}}>
											PAGAR
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default PricingTablePage;
