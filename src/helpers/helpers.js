export function test() {
	return null;
}

export const hasNotch = () => {
	/**
	 * For storybook test
	 */
	const storybook = window.location !== window.parent.location;
	const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
	const aspect = window.screen.width / window.screen.height;
	const aspectFrame = window.innerWidth / window.innerHeight;
	return (
		(iPhone && aspect.toFixed(3) === '0.462') ||
		(storybook && aspectFrame.toFixed(3) === '0.462')
	);
};

export const priceFormat = (price) => {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};
