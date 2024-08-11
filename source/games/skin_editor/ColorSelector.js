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
		}
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
