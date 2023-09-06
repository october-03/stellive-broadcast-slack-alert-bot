import axios from "../../node_modules/axios/index";
import "dotenv/config";

export class Stellar {
	name: string;
	key: string;
	id: string;

	private _title: string = "";
	private _category: string = "";
	private _isBroadcast: boolean = false;

	sendMessage(message: string) {
		axios.post(`${process.env.HOOK_URL}`, {
			text: message + `\n<https://www.twitch.tv/${this.id}|${this.name} 채널 보러가기>`,
		});
	}

	constructor(name: string, key: string, id: string) {
		this.name = name;
		this.key = key;
		this.id = id;
	}

	set title(title: string) {
		const currTitle = this._title;
		if (title !== currTitle) {
			this._title = title;
			if (currTitle) {
				this.sendMessage(`${this.name}의 방송제목이 변경되었습니다.\n${currTitle} -> ${title}`);
			}
		}
	}

	set category(category: string) {
		const currCategory = this._category;
		if (category !== currCategory) {
			this._category = category;
			if (currCategory) {
				this.sendMessage(`${this.name}의 카테고리가 변경되었습니다.\n${currCategory} -> ${category}`);
			}
		}
	}

	set isBroadcast(isBroadcast: boolean) {
		const currIsBroadcast = this._isBroadcast;
		if (isBroadcast !== currIsBroadcast) {
			this._isBroadcast = isBroadcast;
			if (isBroadcast) {
				this.sendMessage(`${this.name}의 방송이 시작되었습니다.\n방송제목: ${this._title}\n카테고리: ${this._category}`);
			} else {
				this.sendMessage(`${this.name}의 방송이 종료되었습니다.`);
			}
		}
	}
}
