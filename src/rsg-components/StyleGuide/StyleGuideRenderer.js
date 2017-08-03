import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import cx from 'classnames';

const s = require('./StyleGuide.css');

function Nav(props) {
	const { pages, children, toc } = props;
	const navLinksJsx = pages.map((page, i) => {
		let addOn = <ul className={s.menuHide}><li>{toc}</li></ul>;
		if(document.location.hash.substr(2, document.location.hash.length) === page.id)
		{
			addOn = <ul><li>{toc}</li></ul>;
		}
		const returnVal =
		<li key={i}>
			<a href={`#!${page.id}`}>{page.name}</a>
			{addOn}
		</li>;
	return (
		returnVal
	);
});

return (
	<div>
		<nav><input type="text" className="myInput" onKeyUp={searchMenu} placeholder="Filter by Name"/>
			<ul className="nav">{navLinksJsx}</ul></nav>
		{children}
	</div>
);
}

function searchMenu(){
    let filter, li, a, i;
	filter = document.getElementsByClassName('myInput')[0].value.toUpperCase();
	li = document.getElementsByClassName("nav")[0].getElementsByTagName('li');

	for (i = 0; i < li.length; i++)
	{
        a = li[i].getElementsByTagName("a")[0];
		if (a.innerHTML.toUpperCase().indexOf(filter) > -1)
		{
            li[i].classList.remove(s.menuHide);
		} else
		{
            li[i].className += " " + s.menuHide;
        }
	}
}


Nav.propTypes = {
	pages: PropTypes.array.isRequired,
	children: PropTypes.node,
	toc: PropTypes.node.isRequired
};

const StyleGuideRenderer = ({ title, homepageUrl, components, toc, pages, sidebar, nav }) => (
	<div className={cx(s.root, sidebar && s.hasSidebar, nav && s.hasNav)}>
		<main className={s.content}>
			<div className={s.components}>
				{components}
				<footer className={s.footer}>
				</footer>
			</div>
		</main>
		{sidebar &&
			<div className={s.sidebar}>
				<h1 className={s.heading}>{title}</h1>
				<Nav pages={pages} toc={toc}></Nav>
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
