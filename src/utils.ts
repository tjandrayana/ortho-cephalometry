import html2canvas from 'html2canvas';
import { data } from './data/data';
import { saveAs as save } from 'file-saver';

export function findIndex<T>(array: T[], callback: (point: T) => boolean) {
	for (let index = 0; index < array.length; index++) {
		if (callback(array[index])) {
			return index;
		}
	}
	return -1;
}

export function inRange(input: number, min: number, max: number) {
	return input >= min && input <= max;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		try {
			canvas.toBlob((blob) => {
				if (!blob) {
					return reject(new Error('Could not convert canvas to blob'));
				}
				return resolve(blob);
			});
		} catch (e) {
			return reject(e);
		}
	});
}

function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = function () {
				if (typeof reader.result === 'string') {
					return resolve(reader.result);
				} else {
					return reject(new Error('Could not convert blob to base64'));
				}
			};
		} catch (e) {
			return reject(e);
		}
	});
}

export async function divToBase64(querySelector: string) {
	const el: HTMLElement | null = document.querySelector(querySelector);
	if (!el) {
		return '';
	}
	const canvas = await html2canvas(el);
	const blob = await canvasToBlob(canvas);
	const base64 = await blobToBase64(blob);
	return base64;
}

export function saveAs(base64: string, fileName: string) {
	save(base64, fileName);
}

export async function exportDiv(querySelector: string, name: string) {
	const base64 = await divToBase64(querySelector);
	saveAs(base64, name + '.png');
}

export function saveToPatient() {
	const topWindow = window.top;
	if (topWindow) {
		topWindow.postMessage(
			'cephalometric-save:' +
				JSON.stringify({
					imgSource: data.imgSource,
					currentAnalysisName: data.currentAnalysisName,
					pointCoordinates: data.pointCoordinates
				}),
			'*'
		);
	}
}

export function export2Base64() {
	const dataToSave = btoa(
		JSON.stringify({
			imgSource: data.imgSource,
			currentAnalysisName: data.currentAnalysisName,
			pointCoordinates: data.pointCoordinates
		})
	);

	const file = new Blob(['cephalometric_project:' + dataToSave], {
		type: 'text/plain'
	});
	const fileName = prompt('File name');
	save(file, `${fileName || new Date().toLocaleDateString()}.cephalometric`);
}

function getQueryParam(name: string): string | null {
	return new URLSearchParams(window.location.search).get(name);
}

export async function exportAndSend(apiUrl: string, appointmentId: string) {
	try {
		const base64Image = await divToBase64('#container');
		const imageBlob = await (await fetch(base64Image)).blob();

		const cephBase64 = btoa(
			JSON.stringify({
				imgSource: data.imgSource,
				currentAnalysisName: data.currentAnalysisName,
				pointCoordinates: data.pointCoordinates
			})
		);
		const cephBlob = new Blob(['cephalometric_project:' + cephBase64], { type: 'text/plain' });

		const formData = new FormData();
		formData.append('appointment_id', appointmentId);
		formData.append('image', imageBlob, 'hasil.png');
		formData.append('cephalometry', cephBlob, 'hasil.cephalometry');

		const response = await fetch(apiUrl, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error('Upload gagal: ' + response.statusText);
		}

		await response.json();
		alert('Proses simpan sefalometri ke data pemeriksaan pasien berhasil !');
	} catch (error: any) {
		console.error('Error upload:', error);
		alert('Upload gagal: ' + error.message);
	}
}

export async function resetAnalysis() {
	const clinicApiUrl = import.meta.env.VITE_CLINIC_API_URL;
	const appointmentId = getQueryParam('appointment_id');
	if (!clinicApiUrl || !appointmentId) {
		return;
	}
	try {
		const res = await fetch(
			`/api/patient-service/examination/cephalometry-by-appointment?appointment_id=${encodeURIComponent(appointmentId)}`,
			{
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			}
		);
		if (res.ok && res.status === 200) {
			window.location.reload();
		} else {
			console.error(`Error ${res.status}: ${res.statusText}`);
		}
	} catch (error: any) {
		console.error('Error reset:', error);
		alert('Reset gagal: ' + error.message);
	}
}

