export class ColorSelector {
	constructor() {
		let temp = this;
		$('.color-input').change(function () {
			var type = $(this).attr('id');
			temp.setColor(type, $(this).val());
		});
		this.color = [0, 0, 0];
		this.opacity = 255;
		this.updateColor();
	}

	setColorFromRGBA(R, G, B, A) {
		this.color = [R, G, B];
		this.opacity = A;
		this.updateColor();
	}

	setColor(type, value) {
		switch (type) {
			case 'color':
				value = value.substring(1);
			case 'hex':
				this.color = [parseInt(value.substring(0, 2), 16), parseInt(value.substring(2, 4), 16), parseInt(value.substring(4, 6), 16)];
				break;
			case 'A':
				this.opacity = parseInt(value);
				break;
			case 'R':
			case 'G':
			case 'B':
				this.color['RGB'.indexOf(type)] = parseInt(value);
				break;
		}
		this.updateColor();
	}

	updateColor() {
		$('#hex').val(this.colorToHex());
		$('#R').val(this.color[0]);
		$('#G').val(this.color[1]);
		$('#B').val(this.color[2]);
		$('#A').val(this.opacity);
		$('#color').val("#" + this.colorToHex());
	}

	colorToHex() {
		return this.color[0].toString(16).padStart(2, '0') + this.color[1].toString(16).padStart(2, '0') + this.color[2].toString(16).padStart(2, '0');
	}
}
