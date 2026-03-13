import React, {useContext, useEffect, useState} from 'react';
import {StudioServerConnectionCtx} from '../helpers/client-id';
import {Spacing} from './layout';
import {OpenEditorButton} from './OpenEditorButton';
import {Spinner} from './Spinner';

const cwd: React.CSSProperties = {
	fontSize: 13,
	opacity: 0.8,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const spinnerSize = 14;

const spinner: React.CSSProperties = {
	position: 'relative',
	width: spinnerSize,
	marginTop: 4,
};

const noSpinner: React.CSSProperties = {
	position: 'relative',
	width: spinnerSize,
};

export const MenuBuildIndicator: React.FC = () => {
	const [isBuilding, setIsBuilding] = useState(false);
	const ctx = useContext(StudioServerConnectionCtx).previewServerState;

	const showButton = window.picus_editorName && ctx.type === 'connected';
	useEffect(() => {
		window.picus_isBuilding = () => {
			setIsBuilding(true);
		};

		window.picus_finishedBuilding = () => {
			setIsBuilding(false);
		};

		return () => {
			window.picus_isBuilding = undefined;
			window.picus_finishedBuilding = undefined;
		};
	}, []);

	return (
		<div style={cwd} title={window.picus_cwd}>
			{showButton ? <Spacing x={2} /> : null}
			{isBuilding ? (
				<div style={spinner}>
					<Spinner duration={0.5} size={spinnerSize} />
				</div>
			) : (
				<div style={noSpinner} />
			)}
			{showButton ? <Spacing x={0.5} /> : null}
			{window.picus_projectName}
			{showButton ? <Spacing x={0.25} /> : null}
			{showButton ? (
				<OpenEditorButton type="editor" />
			) : window.picus_gitSource ? (
				<OpenEditorButton type="git" />
			) : null}
		</div>
	);
};
