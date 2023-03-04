import { NextApiRequest, NextApiResponse } from "next";
import playersHandler from "./index";
import { data } from "../db/data";
import { createMocks } from "node-mocks-http";

import { mockPlayer, reqGetAll } from "./utils";

describe("playersHandler", () => {
  beforeEach(() => {
    // Mock the players data
    // adding a mockPlayer to test with it
    data.push(mockPlayer);
  });

  afterEach(() => {
    // removing the mockPlayer that we added previously
    const indexToDelete = data.findIndex(
      (player) => player.firstname === mockPlayer.firstname
    );
    data.splice(indexToDelete, 1)[0];
  });

  it("should return the first page of players by default", async () => {
    const { req, res } = reqGetAll;

    await playersHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      players: data.slice(0, 3),
      currentPage: 1,
      totalPages: 7,
    });
  });

  it("should return the requested page of players", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      url: `/api/players`,
      query: {
        page: "2",
      },
    });

    await playersHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      players: [
        {
          firstname: "Andres",
          lastname: "Iniesta",
          goal: 126,
          salary: 35000000,
          devise: "$",
          pictureURl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9s_Iniesta.jpg/250px-Andr%C3%A9s_Iniesta.jpg",
        },
        {
          firstname: "Robert ",
          lastname: "Lewandowski",
          goal: 134,
          salary: 23000000,
          devise: "€",
          pictureURl:
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Robert_Lewandowski%2C_FC_Bayern_M%C3%BCnchen_%28by_Sven_Mandel%2C_2019-05-27%29_01.jpg",
        },
        {
          firstname: "Mohamed",
          lastname: "Salah",
          goal: 97,
          salary: 19730000,
          devise: "€",
          pictureURl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Mohamed_Salah%2C_Liverpool_FC_gegen_1._FSV_Mainz_05_%28Testspiel_23._Juli_2021%29_26.jpg/1200px-Mohamed_Salah%2C_Liverpool_FC_gegen_1._FSV_Mainz_05_%28Testspiel_23._Juli_2021%29_26.jpg",
        },
      ],
      currentPage: 2,
      totalPages: 7,
    });
  });

  it("should return the frst elements of the array if the requested page is out of range", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      url: `/api/players`,
      query: {
        page: "999",
      },
    });

    await playersHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      players: data.slice(0, 3),
      currentPage: 1,
      totalPages: 7,
    });
  });
});

it("should return players matching the search query", async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    url: `/api/players`,
    query: {
      search: "ma",
    },
  });
  await playersHandler(req, res);

  expect(res.statusCode).toBe(200);
  console.log("first : ", res._getJSONData());
  expect(res._getJSONData()).toEqual({
    players: [
      {
        firstname: "Neymar",
        lastname: "JR.",
        goal: 33,
        salary: 95000000,
        devise: "€",
        pictureURl:
          "https://i0.wp.com/www.afriquesports.net/wp-content/uploads/2022/07/NEYMAR-JR-1437082.jpeg?fit=2048%2C1152&ssl=1",
      },
      {
        firstname: "Marcos Aoás Corrêa",
        lastname: "Marquinhos",
        goal: 44,
        salary: 1200000,
        devise: "€",
        pictureURl:
          "https://www.allosport.net/uploads/2022/20/1/625_psg-marquinhos-a-hesite-a-quitter-la-bande-a-neymar-mbappe-et-messi.jpg",
      },
      {
        firstname: "Marco",
        lastname: "Verratti",
        goal: 30,
        salary: 599999,
        devise: "€",
        pictureURl:
          "https://img.a.transfermarkt.technology/portrait/big/102558-1602849501.jpg?lm=1",
      },
    ],
    currentPage: 1,
    totalPages: 2,
  });
});

it("should return players not filtered by name if search param is empty the search query", async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    url: `/api/players`,
    query: {
      search: "",
    },
  });
  await playersHandler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({
    players: data.slice(0, 3),
    currentPage: 1,
    totalPages: 7,
  });
});

it("should return an empty array if no players match the search query", async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    url: `/api/players`,
    query: {
      search: "xyz",
    },
  });
  await playersHandler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({
    players: [],
    currentPage: 1,
    totalPages: 1,
  });
});

it("should return a 405 error for non-GET requests", async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "POST",
  });
  await playersHandler(req, res);

  expect(res.statusCode).toBe(405);
  expect(res._getJSONData()).toEqual({
    message: "Method POST not allowed",
  });
});
