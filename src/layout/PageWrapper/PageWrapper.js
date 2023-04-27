import React, { useLayoutEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageWrapper = forwardRef(({ description, className, children }, ref) => {
	useLayoutEffect(() => {
		document.getElementsByTagName('TITLE')[0].text = 'DOMUS';
		document
			.querySelector('meta[name="description"]')
			.setAttribute('content', description || process.env.REACT_APP_META_DESC);
	});

	return (
		<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
			{children}
		</div>
	);
});
PageWrapper.propTypes = {
	description: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	description: null,
	className: null,
};

export default PageWrapper;
