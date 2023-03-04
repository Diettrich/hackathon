import { NextApiRequest, NextApiResponse } from "next";

import players, { Player } from "../db/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { firstname } = req.query;
      if (firstname && typeof firstname === "string") {
        const player: Player | undefined = players.find(
          (player) =>
            player.firstname.toLocaleLowerCase() ===
            firstname.toLocaleLowerCase()
        );
        if (player) {
          res.status(200).json(player);
        } else {
          res
            .status(404)
            .json({ message: `Player with name ${firstname} not found` });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
