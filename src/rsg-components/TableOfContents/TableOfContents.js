import React, { Component, PropTypes } from 'react';
import { filterComponentsByName, getFilterRegExp } from '../../utils/utils';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import Pages from 'rsg-components/Pages';

export default class TableOfContents extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
		};
	}

	getComponents(components, searchTerm) {
		return filterComponentsByName(components || [], searchTerm);
	}

	getSections(Pages, searchTerm) {
		console.log(Pages)
		const regExp = getFilterRegExp(searchTerm);
		Pages = Pages || [];
		return Pages.reduce((filteredSections, { name, components: subComponents = [], Pages: subSections }) => {
			subComponents = this.getComponents(subComponents, searchTerm);
			if (subComponents.length || !searchTerm || regExp.test(name)) {
				filteredSections.push({
					heading: true,
					name,
					content: this.renderLevel(subComponents, subSections, searchTerm),
				});
			}
			return filteredSections;
		}, []);
	}

	renderLevel(components, Pages, searchTerm) {
		const items = [
			...this.getComponents(components, searchTerm),
			...this.getSections(Pages, searchTerm),
		];
		return (
			<ComponentsList items={items} />
		);
	}

	render() {
		const { searchTerm } = this.state;
		const { components, Pages } = this.props;

		return (
			<TableOfContentsRenderer
				searchTerm={searchTerm}
				items={this.renderLevel(components, Pages, searchTerm)}
				onSearchTermChange={searchTerm => this.setState({ searchTerm })}
			/>
		);
	}
}
