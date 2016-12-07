import React from 'react';
import { LinkRenderer } from './LinkRenderer';

it('renderer should render link', () => {
	const href = '/foo';
	const children = 'Foo';
	const actual = shallow(
		<LinkRenderer href={href} classes={{}}>{children}</LinkRenderer>
	);

	expect(actual).toMatchSnapshot();
});
