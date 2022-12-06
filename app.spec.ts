import { default as request } from "supertest";
import makeApp from "./app";
import nock from "nock";

const createExercise = jest.fn();
const getExerciseById = jest.fn();
const getAllExercises = jest.fn();

const app = makeApp({ createExercise, getExerciseById, getAllExercises });
const validExerciseData = {
  startTime: "2022-06-01 10:30",
  durationInSeconds: 360,
  activityType: "running",
};

// Nock mockning functions start
const openMeteoApi = nock("https://api.open-meteo.com");
beforeAll(() => {
  openMeteoApi
    .get(
      "/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT"
    )
    .times(1)
    .reply(200, {
      daily: { time: ["2022-06-08"], temperature_2m_max: [25.6] },
    });
});

beforeEach(() => {
  createExercise.mockReset();
  createExercise.mockResolvedValue({
    startTime: "2022-06-01 10:30",
    durationInSeconds: 360,
    activityType: "running",
  });

  getExerciseById.mockResolvedValue({
    startTime: "2022-06-01 10:30",
    durationInSeconds: 360,
    activityType: "running",
  });
});

afterEach(() => {
  getAllExercises.mockResolvedValue([
    {
      startTime: "2022-06-01 10:30",
      durationInSeconds: 260,
      activityType: "running",
      _v: 0,
    },
    {
      startTime: "2022-06-01 10:30",
      durationInSeconds: 360,
      activityType: "walking",
      _v: 0,
    },
    {
      startTime: "2022-06-01 10:30",
      durationInSeconds: 160,
      activityType: "biking",
      _v: 0,
    },
  ]);
});

// End of nock mockning functions
describe("POST/exercise", () => {
  // create exercise
  it("should return 200 status code when posting exercise with valid data", async () => {
    const response = await request(app)
      .post("/exercise")
      .send(validExerciseData);
    expect(response.statusCode).toBe(200);
  });

  it("should return content-type = json", async () => {
    const response = await request(app).post("/exercise");

    expect(response.headers["content-type"].indexOf("json") > -1).toBeTruthy();
  });

  it("should return 400 status code if sending invalid post data", async () => {
    const response = await request(app).post("/exercise").send({
      durationInSeconds: 360,
      activityType: "running",
    });

    expect(response.statusCode).toBe(400);
  });
});

// Get exercise by id
describe("GET /exercise/:id", () => {
  it("should return temperature with correct value", async () => {
    const response = await request(app).get(
      "/exercise/638e64f32412272628733676"
    );
    expect(response.body.temperature).toBe(25.6);
  });

  it("should return 400 when id does not exist or invalid", async () => {
    const response = await request(app).get("/exercise/noId");

    expect(response.statusCode).toBe(400);
  });
});

// Get all exercises
describe("GET /exercises", () => {
  it("should return 200 status code when getting all exercises", async () => {
    const response = await request(app).get("/exercises");

    expect(response.statusCode).toBe(200);
  });

  it("should return data  when getting all exercises", async () => {
    const response = await request(app).get("/exercises");
    expect(response.body).toStrictEqual([
      {
        startTime: "2022-06-01 10:30",
        durationInSeconds: 260,
        activityType: "running",
        _v: 0,
      },
      {
        startTime: "2022-06-01 10:30",
        durationInSeconds: 360,
        activityType: "walking",
        _v: 0,
      },
      {
        startTime: "2022-06-01 10:30",
        durationInSeconds: 160,
        activityType: "biking",
        _v: 0,
      },
    ]);
  });

  it("should return 404 when id does not exist ", async () => {
    getAllExercises.mockResolvedValue([]);
    const response = await request(app).get("/exercises");
    console.log(response.body);// it should be an empty object
    expect(response.statusCode).toBe(404);
  });
});
