import { Stellar } from "./class/Stellar";
import ApiService from "./service/ApiService";
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
	console.log(req_ids);
};

const getStream = async () => {
	await getStellive();
	await getTitle();
};

getStream();
