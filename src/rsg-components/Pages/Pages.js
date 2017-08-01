import React, { PropTypes } from 'react';
// import _ from 'lodash';
import isFinite from 'lodash/isFinite';
import {
	// getComponentNameFromHash,
	// filterComponentsByExactName,
	// filterComponentExamples,
	// filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
} from '../../utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

function Nav(props) {
	const { pages, children } = props;

	const navLinksJsx = pages.map((page, i) => {
		return (<li key={i}><a href={`#!${page.id}`}>{page.name}</a></li>);
	});

	return (
		<div>
			<nav><ul>{navLinksJsx}</ul></nav>
			{children}
		</div>
	);
}

Nav.propTypes = {
	pages: PropTypes.array.isRequired,
	children: PropTypes.node,
};

export default function Pages({ config, pages, hash }) {
	let selected = 0;
	const codeKey = (Math.random() * (100 - 0) + 0);

	pages.map((page, i) => {
		if (page.id === hash) {
			selected = i;
		}
	});

	const components = processComponents(pages[selected].components);
	const sections = processSections(pages[selected].sections || []);
	const sidebar = true;
	const singleExample = false;

	// parse url hash to check if the components list must be filtered
	/* const {
		// name of the filtered component to show isolated
		targetComponentName,
		// index of the fenced block example of the filtered component isolate
		targetComponentIndex,
	} = getComponentNameFromHash();

	// filter the requested component id required
	if (targetComponentName) {
		components = [
			...filterComponentsByExactName(components, targetComponentName),
			...filterComponentsInSectionsByExactName(sections, targetComponentName),
		];
		sections = [];
		sidebar = false;

		// if a single component is filtered and a fenced block index is specified hide the other examples
		if (components.length === 1 && isFinite(targetComponentIndex)) {
			components[0] = filterComponentExamples(components[0], targetComponentIndex);
			singleExample = true;
		}
	} */
	alert(Object.keys(pages[0]));
	return (
		<Nav pages={pages}>
			<StyleGuide
				codeKey={codeKey}
				config={config}
				components={components}
				sections={sections}
				sidebar={sidebar}
				nav={pages && pages.length > 0}
				singleExample={singleExample}
			/>
		</Nav>
	);
}

Pages.propTypes = {
	pages: PropTypes.array.isRequired,
	config: PropTypes.object.isRequired,
	hash: PropTypes.string,
};
