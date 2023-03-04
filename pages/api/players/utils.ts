import { NextApiRequest, NextApiResponse } from "next";
import { createMocks, createRequest, createResponse } from "node-mocks-http";
import { Player } from "../db/data";

export const mockPlayer: Player = {
  firstname: "MockPlayer",
  lastname: "Zidane",
  goal: 93,
  salary: 118000000,
  devise: "$",
  pictureURl:
    "https://img.a.transfermarkt.technology/portrait/big/50202-1537861481.jpg?lm=1",
};

export const reqGetAll = createMocks<NextApiRequest, NextApiResponse>({
  method: "GET",
  url: `/api/players`,
  query: {
    page: "1",
  },
});
