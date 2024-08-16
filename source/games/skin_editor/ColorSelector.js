export class ColorSelector {
	constructor() {
		this.recentColors = new Array(5).fill([0, 0, 0, 255]);
		this.setColorFromRGBA(0, 0, 0, 255);
		let temp = this;
		$('.color-input').change(function () {
			var type = $(this).attr('id');
			temp.setColor(type, $(this).val());
		});
		$('.recentColor').click(function () {
			let index = $(this).attr('id').substring(12);
			temp.setColorFromRGBA(temp.recentColors[index][0], temp.recentColors[index][1], temp.recentColors[index][2], temp.recentColors[index][3]);
		});
	}

	addRecentColor() {
		let color = [this.color[0], this.color[1], this.color[2], this.opacity];
		let exits = this.recentColors.find(c => c[0] == color[0] && c[1] == color[1] && c[2] == color[2] && c[3] == color[3]);
		if (exits == undefined) {
			this.recentColors.unshift(color);
			if (this.recentColors.length > 5) {
				this.recentColors.pop();
			}
		} else {
			this.recentColors.splice(this.recentColors.indexOf(exits), 1);
			this.recentColors.unshift(exits);	
		}
		this.updateRecentColors();
	}

	updateRecentColors() {
		for (let i = 0; i < 5; i++) {
			$('#recentColor-' + i).css('background-color', 'rgba(' + this.recentColors[i].join(',') + ')');
		}
	}

	setColorFromRGBA(R, G, B, A) {
		this.color = [R, G, B];
		this.opacity = A;
		this.addRecentColor();
		this.updateColor();
	}

	setColor(type, value) {
		switch (type) {
			case 'color':
				value = value.substring(1);
			case 'hex':
				this.setColorFromRGBA(parseInt(value.substring(0, 2), 16), parseInt(value.substring(2, 4), 16), parseInt(value.substring(4, 6), 16), this.opacity);
				break;
			case 'A':
				this.setColorFromRGBA(this.color[0], this.color[1], this.color[2], parseInt(value));
				break;
			case 'R':
			case 'G':
			case 'B':
				let index = 'RGB'.indexOf(type);
				let color = this.color;
				color[index] = parseInt(value);
				this.setColorFromRGBA(color[0], color[1], color[2], this.opacity);
				break;
			case 'H':
			case 'S':
			case 'V':
				let hsv = [parseInt($('#H').val()), parseInt($('#S').val()), parseInt($('#V').val())];
				let rgb = this.calculateRGB(hsv[0], hsv[1], hsv[2]);
				this.setColorFromRGBA(rgb[0], rgb[1], rgb[2], this.opacity);
				break;
		}
	}

	updateColor() {
		$('#hex').val(this.colorToHex());
		$('#R').val(this.color[0]);
		$('#G').val(this.color[1]);
		$('#B').val(this.color[2]);
		$('#A').val(this.opacity);
		let hsv = this.calculateHSV();
		$('#H').val(hsv[0]);
		$('#S').val(hsv[1]);
		$('#V').val(hsv[2]);
		$('#color').val("#" + this.colorToHex());
	}

	colorToHex() {
		return this.color[0].toString(16).padStart(2, '0') + this.color[1].toString(16).padStart(2, '0') + this.color[2].toString(16).padStart(2, '0');
	}

	calculateHSV() {
		let R = this.color[0] / 255;
		let G = this.color[1] / 255;
		let B = this.color[2] / 255;
		let max = Math.max(R, G, B);
		let min = Math.min(R, G, B);
		let delta = max - min;
		let H = 0;
		let S = 0;
		let V = max;
		if (delta != 0) {
			S = delta / max;
			if (R == max) {
				H = (G - B) / delta;
			} else if (G == max) {
				H = 2 + (B - R) / delta;
			} else {
				H = 4 + (R - G) / delta;
			}
		}
		H *= 60;
		if (H < 0) {
			H += 360;
		}
		H = Math.round(H);
		S = Math.round(S * 100);
		V = Math.round(V * 100);
		return [H, S, V];
	}

	calculateRGB(H, S, V) {
		S /= 100;
		V /= 100;
		let C = V * S;
		let X = C * (1 - Math.abs((H / 60) % 2 - 1));
		let m = V - C;
		let R = 0;
		let G = 0;
		let B = 0;
		if (H < 60) {
			R = C;
			G = X;
		} else if (H < 120) {
			R = X;
			G = C;
		} else if (H < 180) {
			G = C;
			B = X;
		} else if (H < 240) {
			G = X;
			B = C;
		} else if (H < 300) {
			R = X;
			B = C;
		} else {
			R = C;
			B = X;
		}
		return [Math.round((R + m) * 255), Math.round((G + m) * 255), Math.round((B + m) * 255)];
	}
}
