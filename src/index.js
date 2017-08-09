import React from 'react';
import _ from 'lodash';
import isFinite from 'lodash/isFinite';
import ReactDOM from 'react-dom';
import {
	getComponentNameFromHash,
	filterComponentsByExactName,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';
import Pages from 'rsg-components/Pages';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';
import es6ObjectAssign from 'es6-object-assign';

es6ObjectAssign.polyfill();

// Make libraries available in examples
global.React = React;
global._ = _;

let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('styleguide!index.js');
	const hash = document.location.hash.replace('#!', '');
	const x = 0;
	let components_raw = styleguide.components;
	let sections_raw = styleguide.sections;
	if(styleguide.pages)
	{
		if (styleguide.pages.length > 0) {
			let selected = 0;

			styleguide.pages.map((page, i) => {
				if (page.id === hash) {
					selected = i;
				}
			});

			components_raw = styleguide.pages[selected].components;
			sections_raw = styleguide.pages[selected].sections;
		}
	}


	let components = processComponents(components_raw);
	let sections = processSections(sections_raw || []);
	let sidebar = true;
	let singleExample = false;

	// parse url hash to check if the components list must be filtered
	const {
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
	}

	if(!styleguide.pages)
	{
		ReactDOM.render(
		<StyleGuide
			codeKey={codeKey}
			config={styleguide.config}
			components={components}
			sections={sections}
			sidebar={sidebar}
			singleExample={singleExample}
		/>,
		document.getElementById('app')
		);
	}
	else
	{
		ReactDOM.render(
		<Pages
			pages={styleguide.pages}
			config={styleguide.config}
			hash={hash}
		/>,
			document.getElementById('app')
		);
	}



}

window.addEventListener('hashchange', ()=>
	{
		if(document.location.hash.substr(0,2) === '#!' )
			{
				renderStyleguide();
			}

	}
);

if (module.hot) {
	module.hot.accept('styleguide!index.js', () => {
		codeKey += 1;
		renderStyleguide();
	});
}

renderStyleguide();
