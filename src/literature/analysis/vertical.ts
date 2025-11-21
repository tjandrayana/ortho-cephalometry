import { Analysis } from './analysis';
import { angles } from '../angles';
import { distances } from '../distances';
import { findIndex } from '../../utils';
export class Vertical extends Analysis {
	title = 'Vertical Analysis';
	angles = [angles['Me-Go^Po-Or'], angles['Me-Go^ANS-PNS']];
	auxLines = ['ANS-PNS'];
	distances = [distances['N-NMP'], distances['Me-MMP']];

	get otherAnalysisResultComment() {
		const upperIndex = findIndex(this.DistanceValues, (x) => x.id === 'N-NMP');
		const lowerIndex = findIndex(this.DistanceValues, (x) => x.id === 'Me-MMP');
		if (upperIndex === -1 || lowerIndex === -1) return '';
		const upper = this.DistanceValues[upperIndex].value;
		const lower = this.DistanceValues[lowerIndex].value;
		if (typeof upper === 'number' && typeof lower === 'number') {
			const total = upper + lower;
			const lowerPercentage = Math.round((lower / total) * 1000) / 10;
			return `Lower facial height is ${lowerPercentage} of the total percentage, while the population mean is 54 ± 3.5% which means that the lower facial height is ${
				lowerPercentage > 57.5 ? 'increased' : lowerPercentage < 50.5 ? 'decreased' : 'normal'
			} in relation to the upper facial height.`;
		}
		return '';
	}
}

export default new Vertical();

