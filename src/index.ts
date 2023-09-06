import { Stellar } from "./class/Stellar";
import ApiService from "./service/ApiService";
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

const getIsBroadcast = async () => {};

const getStream = async () => {
	await getStellive();
	await getTitle();
};

getStream();
