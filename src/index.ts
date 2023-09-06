import { Stellar } from "./class/Stellar";
import ApiService from "./service/ApiService";
import BroadcastResponse from "./types/Broadcast";
import ChannelResponse from "./types/Channel";
import TeamResponse from "./types/Team";

const stellive: Stellar[] = [];

const getStellive = async () => {
	const res = await ApiService.get<TeamResponse>("/teams?name=stellive");
	const userList = res.data.data[0].users;

	userList.forEach((user) => {
		stellive.push(new Stellar(user.user_name, user.user_id, user.user_login));
	});
};

const getTitle = async () => {
	const req_ids = stellive.map((stellar) => `broadcaster_id=${stellar.key}`).join("&");
	const res = await ApiService.get<ChannelResponse>(`channels?${req_ids}`);
	const broadcastList = res.data.data;

	stellive.map((stellar) => {
		const broadcast = broadcastList.find((broadcast) => broadcast.broadcaster_id === stellar.key);
		if (broadcast) {
			stellar.title = broadcast.title;
			stellar.category = broadcast.game_name;
		}
	});
};

const getIsBroadcast = async () => {
	const req_nicknames = stellive.map((stellar) => `user_login=${stellar.id}`).join("&");
	const res = await ApiService.get<BroadcastResponse>(`streams?${req_nicknames}`);

	stellive.map((stellar) => {
		const broadcast = res.data.data.find((broadcast) => broadcast.user_login === stellar.id);
		if (broadcast) {
			stellar.isBroadcast = true;
		} else {
			stellar.isBroadcast = false;
		}
	});
};

const getStream = async () => {
	await getStellive();
	console.log("Stellive alert start " + new Date().toLocaleString());
	while (true) {
		console.log("Stellive alert request " + new Date().toLocaleString());
		await getTitle();
		await getIsBroadcast();
		await new Promise((resolve) => setTimeout(resolve, 1000 * 60));
	}
};

getStream();
