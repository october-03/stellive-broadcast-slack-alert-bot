export class Stellar {
	name: string;
	key: string;
	id: string;

	private _title: string = "";
	private _category: string = "";
	private _isBroadcast: boolean = false;
	constructor(name: string, key: string, id: string) {
		this.name = name;
		this.key = key;
		this.id = id;
	}

	set title(title: string) {
		const currTitle = this._title;
		if (title !== currTitle) {
			this._title = title;
			console.log("방송제목 변경됨: " + title);
		}
	}

	set category(category: string) {
		const currCategory = this._category;
		if (category !== currCategory) {
			this._category = category;
			console.log("카테고리 변경됨: " + category);
		}
	}

	set isBroadcast(isBroadcast: boolean) {
		const currIsBroadcast = this._isBroadcast;
		if (isBroadcast !== currIsBroadcast) {
			this._isBroadcast = isBroadcast;
			if (isBroadcast) {
				console.log("방송 시작됨");
			} else {
				console.log("방송 종료됨");
			}
		}
	}
}
