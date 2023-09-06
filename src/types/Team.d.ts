interface BroadCaster {
	user_id: string;
	user_name: string;
	user_login: string;
}

interface Team {
	users: BroadCaster[];
	background_image_url?: string;
	banner?: string;
	created_at: string;
	updated_at: string;
	info: string;
	thumbnail_url?: string;
	team_name: string;
	team_display_name: string;
	id: string;
}

interface TeamResponse {
	data: Team[];
}

export default TeamResponse;
