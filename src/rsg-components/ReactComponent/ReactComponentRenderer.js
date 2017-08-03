import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const s = require('./ReactComponent.css');

const ReactComponentRenderer = ({ name, pathLine, description, props, methods, examples, sidebar }) => {
	//console.log(examples);

	const markdownObject = examples.props.examples;
	const markDownExample = examples;
	let markDownGuidelines = '';
	let guidlines = false;

	for(let i=0; i < markdownObject.length;i++)
	{
		if(markdownObject[i].content.substring(3,9) === '#Break')
		{
			markDownGuidelines += markdownObject[i].content.substring(9,markdownObject[i].content.length);
			markDownExample.props.examples[i].content = "";
		}else
		{
			markDownExample.props.examples[i].content = markdownObject[i].content ;
		}
	}

	return (
		<div className={s.root} id={name + '-container'}>
			<header className={s.header}>
				<h2 className={s.primaryHeading} id={name}>
					{name}
				</h2>
				<div className={s.pathLine}>{pathLine}</div>
				{sidebar ? (
					<a className={s.isolatedLink} href={'#!/' + name}>Open isolated ⇢</a>
				) : (
					<a className={s.isolatedLink} href="/">← Back</a>
				)}
			</header>
			<div>
				{description}
			</div>
			{markDownExample}
			{
				props && (
					<div className={s.props}>
						<h3 className={s.heading}>Props</h3>
						{props}
					</div>
				)
			}
			{
				methods ? (
					<div className={s.methods}>
						<h3 className={s.heading}>Methods</h3>
						{methods}
					</div>
				) : false
			}
			<Markdown
				text={markDownGuidelines}
			/>
		</div>
	);
};

ReactComponentRenderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	methods: PropTypes.node,
	examples: PropTypes.node,
	sidebar: PropTypes.bool,
};

export default ReactComponentRenderer;
