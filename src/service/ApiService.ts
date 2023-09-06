import axios from "../../node_modules/axios/index";
import "dotenv/config";

const ApiService = axios.create({
	baseURL: "https://api.twitch.tv/helix",
	headers: {
		Authorization: `Bearer ${process.env.API_TOKEN}`,
		"Client-Id": process.env.API_CLIENT_ID,
	},
});

export default ApiService;
