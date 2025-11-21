import React from 'react';
import { observer } from 'mobx-react-lite';

interface PointViewProps {
	id: string;
	description: string;
	top: number;
	left: number;
	onDragged: (ev: React.DragEvent<HTMLDivElement>) => void;
	showNames: boolean;
}

export const PointView = observer((props: PointViewProps) => {
	return (
		<div
			className="landmark"
			onDragEnd={(ev) => props.onDragged(ev)}
			onDragLeave={(ev) => props.onDragged(ev)}
			id={props.id}
			draggable
			style={{
				top: props.top + '%',
				left: props.left + '%'
			}}
		>
			{props.showNames ? props.id : ''}
		</div>
	);
});

