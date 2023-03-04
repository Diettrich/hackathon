import { NextApiRequest, NextApiResponse } from "next";

import players from "../db/data";

export default async function playersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const pageSize = 3; // Number of players to return per page

  switch (method) {
    case "GET":
      const { page, search } = req.query;
      let allPlayers = players;
      if (search) {
        const searchRegex = new RegExp(search as string, "i");

        // Filter the player data based on the search query
        allPlayers =
          search.length > 0
            ? players.filter((player) => {
                return (
                  searchRegex.test(player.firstname.toLocaleLowerCase()) ||
                  searchRegex.test(player.lastname.toLocaleLowerCase())
                );
              })
            : players;
      }

      let pageInt = parseInt(page as string) || 1;
      let startIdx = (pageInt - 1) * pageSize;

      if (startIdx >= allPlayers.length) {
        pageInt = 1;
        startIdx = 0;
      }

      const endIdx = startIdx + pageSize;
      // Filter the player data based on the page requested
      const pagePlayers = allPlayers.slice(startIdx, endIdx);

      res.status(200).json({
        players: pagePlayers,
        currentPage: pageInt,
        totalPages:
          Math.ceil(allPlayers.length / pageSize) < 1
            ? 1
            : Math.ceil(allPlayers.length / pageSize),
      });
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
