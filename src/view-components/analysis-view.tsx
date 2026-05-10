import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as utils from '../utils';
import Slider from 'rc-slider';
import { AnalysisMethods } from '../data/data';
import { data } from '../data/data';
import { observer } from 'mobx-react-lite';
import { points } from '../literature/points';
import { PointView } from './point';

export const AnalysisView = observer(() => {
	const divRef = useRef<HTMLDivElement>(null);
	const [invert, setInvert] = useState(0);
	const [contrast, setContrast] = useState(100);
	const [brightness, setBrightness] = useState(100);
	const [showCross, setShowCross] = useState(true);
	const [showPointNames, setShowPointNames] = useState(true);
	const [showAdditionalLines, setShowAdditionalLines] = useState(true);
	const [hoveredPoint, setHoveredPoint] = useState('');
	const [showControl, setShowControl] = useState('');
	const [showResults, setShowResults] = useState(false);
	const [markLines, setMarkLines] = useState<string[]>([]);
	const [mouseCoords, setMouseCoords] = useState<number[]>([]);

	const stepDimension = useMemo(() => {
		const calculated =
			(data.innerHeight - data.analysisMethod.requiredPoints.length * 30) /
			data.analysisMethod.requiredPoints.length;
		return calculated > 40 ? 40 : calculated;
	}, [data.innerHeight, data.analysisMethod.requiredPoints.length]);

	useEffect(() => {
		data.innerWidth = window.innerWidth;
		data.innerHeight = window.innerHeight;
		const handleResize = () => {
			data.innerWidth = window.innerWidth;
			data.innerHeight = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
		setMouseCoords([e.clientX, e.clientY]);
	};

	const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
		if (!divRef.current) {
			return;
		}
		if (data.nextPointIndex === -1 || data.nextPointID === undefined) {
			return;
		}
		const left = ((e.pageX - divRef.current.offsetLeft - 5) / data.dimensions.width) * 100;
		const top = ((e.pageY - divRef.current.offsetTop - 5) / data.dimensions.height) * 100;

		data.pointCoordinates[data.nextPointID] = {
			top,
			left
		};
	};

	return (
		<main>
			{showCross ? (
				<div>
					<div className="cursor-line vertical" style={{ left: mouseCoords[0] + 3 }} />
					<div className="cursor-line horizontal" style={{ top: mouseCoords[1] + 3 }} />
				</div>
			) : (
				''
			)}
			<div
				id="container"
				className="container"
				onDragOver={(e) => {
					e.preventDefault();
				}}
				ref={divRef}
				style={{
					width: data.dimensions.width + 'px',
					height: data.dimensions.height + 'px',
					position: 'relative'
				}}
			>
				<img
					onMouseMove={handleMouseMove}
					src={data.imgSource.source}
					style={{
						width: data.dimensions.width,
						height: data.dimensions.height,
						position: 'absolute',
						top: 0,
						left: 0,
						filter: `invert(${invert}%) contrast(${contrast}%) brightness(${brightness}%)`
					}}
					onClick={handleImageClick}
					alt="Cephalometric radiograph"
				/>
				<div className="points">
					{Object.keys(data.pointCoordinates)
						.filter((x) => data.analysisMethod.requiredPoints.indexOf(x) > -1)
						.map((id) => (
							<PointView
								showNames={showPointNames}
								key={id}
								onDragged={(ev) => {
									if (!divRef.current) {
										return;
									}
									data.updatePointOnDrop(id, divRef.current, ev);
								}}
								description={points[id]}
								id={id}
								top={(data.pointCoordinates[id] || { top: 0 }).top}
								left={(data.pointCoordinates[id] || { left: 0 }).left}
							/>
						))}
				</div>
				<div className="lines">
					{data.analysisMethod.lines.map((line) => (
						<div key={line.id}>
							<div
								className={
									line.id === '0mm-10mm' ||
									data.analysisMethod.distances.map((x) => x.id).indexOf(line.id) > -1
										? 'distance'
										: ''
								}
								id={line.id}
								style={{
									padding: 0,
									margin: 0,
									height: 2 + 'px',
									backgroundColor: markLines.indexOf(line.id) !== -1 ? 'gold' : '#212121',
									borderColor: markLines.indexOf(line.id) !== -1 ? 'gold' : '#212121',
									lineHeight: '1px',
									position: 'absolute',
									left: line.left + 'px',
									top: line.top + 'px',
									width: line.distance + 'px',
									transform: 'rotate(' + line.angle + 'deg)'
								}}
							/>
							<div
								id={line.id + 'additional'}
								style={{
									display: showAdditionalLines ? '' : 'none',
									padding: 0,
									margin: 0,
									height: 1 + 'px',
									borderBottom: '1px dashed #e3e3e3',
									borderColor: markLines.indexOf(line.id) !== -1 ? 'gold' : '#e3e3e3',
									lineHeight: '1px',
									position: 'absolute',
									left: (line.x?.x_left || 0) + 'px',
									top: (line.x?.x_top || 0) + 'px',
									width: (line.x?.x_distance || 0) + 'px',
									transform: 'rotate(' + (line.x?.x_angle || 0) + 'deg)'
								}}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="steps">
					{data.analysisMethod.requiredPoints.map((pointID) => (
						<div
							style={{
								height: stepDimension + 'px',
								width: stepDimension + 'px',
								lineHeight: stepDimension + 'px'
							}}
							className={`step ${
								data.pointCoordinates[pointID]
									? ' done'
									: data.nextPointID === pointID
									? ' current'
									: ''
							} ${hoveredPoint === pointID ? 'hovered' : ''}`}
							key={pointID}
							onMouseEnter={() => setHoveredPoint(pointID)}
							onMouseLeave={() => setHoveredPoint('')}
						>
							<span className="id">{pointID}</span>
							<span
								className="description"
								style={{
									right: stepDimension + 20 + 'px'
								}}
							>
								{points[pointID]}
							</span>
						</div>
					))}
			</div>
			<div className="controls">
				<div className="control-button">
					<span className="control-symbol" onClick={() => setShowAdditionalLines(!showAdditionalLines)}>
						⇢
					</span>
				</div>
				<div className="control-button">
					<span className="control-symbol" onClick={() => setShowPointNames(!showPointNames)}>
						♇
					</span>
				</div>
				<div className="control-button">
					<span className="control-symbol" onClick={() => setShowCross(!showCross)}>
						✛
					</span>
				</div>
				<div className="control-button">
					<span
						className="control-symbol"
						onClick={() => setShowControl(showControl === 'brightness' ? '' : 'brightness')}
					>
						☀
					</span>
					<div
						className="control-range"
						style={{
							display: showControl === 'brightness' ? 'block' : ''
						}}
					>
						<Slider
							handleStyle={{ borderColor: '#000' }}
							trackStyle={{ backgroundColor: '#e3e3e3' }}
							min={0}
							max={200}
							value={brightness}
							onChange={(n: number | number[]) => {
								setBrightness(Array.isArray(n) ? n[0] : n);
							}}
						/>
					</div>
				</div>
				<div className="control-button">
					<span
						className="control-symbol"
						onClick={() => setShowControl(showControl === 'contrast' ? '' : 'contrast')}
					>
						◐
					</span>
					<div
						className="control-range"
						style={{
							display: showControl === 'contrast' ? 'block' : ''
						}}
					>
						<Slider
							handleStyle={{ borderColor: '#000' }}
							trackStyle={{ backgroundColor: '#e3e3e3' }}
							min={0}
							max={500}
							value={contrast}
							onChange={(n: number | number[]) => {
								setContrast(Array.isArray(n) ? n[0] : n);
							}}
						/>
					</div>
				</div>
				<div className="control-button">
					<span
						className="control-symbol"
						onClick={() => setShowControl(showControl === 'invert' ? '' : 'invert')}
					>
						℧
					</span>
					<div
						className="control-range"
						style={{
							display: showControl === 'invert' ? 'block' : ''
						}}
					>
						<Slider
							handleStyle={{ borderColor: '#000' }}
							trackStyle={{ backgroundColor: '#e3e3e3' }}
							min={0}
							max={100}
							value={invert}
							onChange={(n: number | number[]) => {
								setInvert(Array.isArray(n) ? n[0] : n);
							}}
						/>
					</div>
				</div>
			</div>

			<div className="analysis-selection">
				<select
					onChange={(a) => {
						data.currentAnalysisName = a.target.value.toLowerCase();
					}}
					value={data.currentAnalysisName}
				>
					{Object.keys(AnalysisMethods).map((methodName) => (
						<option key={methodName} value={methodName}>
							{AnalysisMethods[methodName].title}
						</option>
					))}
				</select>
			</div>

			<div className={'results-container '}>
				{data.asInternalApplication ? (
					<button className="save-project" onClick={() => utils.saveToPatient()}>
						⤓ Save to patient
					</button>
				) : (
					''
				)}

				<button className="export-project" onClick={() => utils.export2Base64()}>
					⤓ Export project
				</button>

				<button
					className="export-image"
					onClick={() => {
						utils.exportDiv(
							'#container',
							`${data.analysisMethod.title}_image_${new Date().toLocaleDateString()}`
						);
					}}
				>
					⤓ Save image
				</button>

				{import.meta.env.VITE_API_BASE_URL && (
					<>
						<button
							className="send-project"
							onClick={() => {
								const appointmentId = new URLSearchParams(window.location.search).get('appointment_id') || '';
								utils.exportAndSend(
									`${import.meta.env.VITE_API_BASE_URL}/api/patient-service/examination/cephalometry-by-appointment`,
									appointmentId
								);
							}}
						>
							⤓ Simpan Hasil ke Rekam Medis
						</button>

						<button
							className="reset-project"
							onClick={() => {
								utils.resetAnalysis();
							}}
						>
							X Mulai Ulang Analisis
						</button>
					</>
				)}

				<button className={showResults ? 'show' : ''} onClick={() => setShowResults(!showResults)}>
					☲ {showResults ? 'Hide results' : 'Show results'}
				</button>
				<div className="results" style={{ display: showResults ? 'block' : 'none' }}>
					<div id="result">
						<table>
							<thead>
								<tr>
									<th>Parameter</th>
									<th>Value</th>
									<th>Population mean</th>
									<th>Interpretation</th>
								</tr>
							</thead>
							<tbody>
								{data.analysisMethod.anglesValues.concat(data.analysisMethod.DistanceValues).map((param) => {
									const isAngle = param.id.indexOf('^') > -1;
									return (
										<tr
											key={param.description}
											onMouseEnter={() => {
												setMarkLines([]);
												setMarkLines(param.id.split('^'));
											}}
											onMouseLeave={() => {
												setMarkLines([]);
											}}
										>
											<td>
												{isAngle ? 'Angle: ' : 'Distance: '}
												{param.description}
											</td>
											<td>
												{param.value}
												{param.value ? (isAngle ? '°' : 'mm') : ''}
											</td>
											<td>
												{param.mean} ± {param.deviation}
												{isAngle ? '°' : 'mm'}
											</td>
											<td>{param.interpretation}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<p className="additional-comment">
							{data.analysisMethod.otherAnalysisResultComment
								? data.analysisMethod.otherAnalysisResultComment
								: ''}
						</p>
					</div>
					<button
						className="export-table"
						onClick={() => {
							utils.exportDiv(
								'#result',
								`${data.analysisMethod.title}_results_${new Date().toLocaleDateString()}`
							);
						}}
					>
						⤓ Save table
					</button>
				</div>
			</div>
		</main>
	);
});

