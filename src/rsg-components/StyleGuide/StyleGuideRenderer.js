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
			addOn = <ul className={s.menuShow}><li>{toc}</li></ul>;
		}
		const returnVal =
		<li className="pages" id={page.id} key={i}>
			<a onClick={()=>{bold(page.id)}}href={`#!${page.id}`}>{page.name}</a>
			{addOn}
		</li>;
	return (
		returnVal
	);
});


return (
	<div>
		<nav><input type="text" className={s.myInput} onKeyUp={searchMenu} placeholder="Filter by Name"/>
			<ul className="nav" className={s.pageList}>{navLinksJsx}</ul></nav>
		{children}
	</div>
);
}

function searchMenu(){
    let filter, li, a, i;
	filter = document.getElementsByClassName(s.myInput)[0].value.toUpperCase();
	li = document.getElementsByClassName(s.pageList)[0].getElementsByClassName("pages");
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
//I plan ot write a recursive funtion to search functions
function deepSearch(li){
// if li has more children
// 	call deepsearch again on children
// else
// 	search the current li
}

function bold(id)
{
	const pages = document.getElementsByClassName("pages")
	for(let i=0; i < pages.length; i++)
	{
		if(document.location.hash.substr(2, document.location.hash.length) !== id)
		{
			pages[i].classList.remove(s.fontWeight600);
		}
	}
	 document.getElementById(id).className += " " + s.fontWeight600;
}

Nav.propTypes = {
	pages: PropTypes.array.isRequired,
	children: PropTypes.node,
	toc: PropTypes.node.isRequired
};

const StyleGuideRenderer = ({ title, homepageUrl, components, toc, pages, sidebar, nav }) => (
	<div>
	<div className={s.header}>
		<img className={s.icimsLogo} src="https://icimsinc.sharepoint.com/sites/DAM/DAM%20Assets/iCIMS%20Logo%20White%20-%20Transparent%20Background.png" />
		<p className={s.headerText}>Styleguide</p>

		<div className={s.platformWeb} > <p className={s.platformText}>Responsive Web </p></div>
		<div className={s.platformiOS}> <p className={s.platformText}>iOS </p></div>
		<div className={s.platformAndroid}> <p className={s.platformText}>Android</p></div>
	</div>
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
