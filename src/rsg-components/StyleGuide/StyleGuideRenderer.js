import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import cx from 'classnames';

const s = require('./StyleGuide.css');

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

const StyleGuideRenderer = ({ title, homepageUrl, components, toc, pages, sidebar, nav }) => (
	<div className={cx(s.root, sidebar && s.hasSidebar, nav && s.hasNav)}>
		<main className={s.content}>
			<div className={s.components}>
				{components}
				<footer className={s.footer}>
					<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
				</footer>
			</div>
		</main>
		{sidebar &&
			<div className={s.sidebar}>
				<h1 className={s.heading}>{title}</h1>
				<Nav pages={pages}></Nav>
				{/* {toc} */}

			</div>
		}
	</div>
);

StyleGuideRenderer.propTypes = {
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
	nav: PropTypes.bool
};

export default StyleGuideRenderer;
