import { getUserData } from "../util.js";
import * as api from "./api.js";

const login = api.login;
const register = api.register;
const logout = api.logout;

//other requests

async function getTeams() {
  const teams = await api.get("/data/teams");
  const members = await getMembers(teams.map((t) => t._id));
  teams.forEach((t) => {
    t.memberCount = members.filter((m) => m.teamId == t._id).length;
  });

  return teams;
}

async function getMyTeams() {
  const userId = getUserData().id;
  const teamMembership = await api.get(
    `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`
  );
  const teams = teamMembership.map((r) => r.team);
  const members = await getMembers(teams.map((t) => t._id));
  teams.forEach(
    (t) => (t.memberCount = members.filter((m) => m.teamId == t._id).length)
  );

  return teams;
}

async function getTeamById(id) {
  return await api.get(`/data/teams/${id}`);
}

async function createTeam(teamData) {
  return await api.post("/data/teams", teamData);
}

async function editTeam(teamData, id) {
  return await api.put(`/data/teams/${id}`, teamData);
}

async function deleteTeam(id) {
  return await api.del(`/data/teams/${id}`);
}

async function requestToJoin(teamId) {
  const body = { teamId };
  return await api.post("/data/members", body);
}

//members collection

async function getRequestsbyTeamId(teamId) {
  return api.get(
    `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
  );
}

async function getMembers(teamIds) {
  const query = encodeURIComponent(
    `teamId IN ("${teamIds.join('", "')}") AND status="member"`
  );
  return await api.get(`/data/members?where=${query}`);
}

async function cancelMembership(requestId) {
  return await api.del(`/data/members/${requestId}`);
}

async function approveMembership(request) {
  const body = {
    teamId: request.teamId,
    status: "member",
  };

  return await api.put(`/data/members/${request._id}`, body);
}

export {
  login,
  register,
  logout,
  getTeams,
  getTeamById,
  createTeam,
  editTeam,
  deleteTeam,
  requestToJoin,
  getMembers,
  getRequestsbyTeamId,
  cancelMembership,
  approveMembership,
  getMyTeams,
};
