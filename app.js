import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const kv = await Deno.openKv();
const app = new Hono();

// Utility functions for KV interactions
const getFeedbackCount = async (feedbackValue) => {
  const key = ["feedback", feedbackValue];
  const result = await kv.get(key);
  return result?.value || 0;
};

const incrementFeedbackCount = async (feedbackValue) => {
  const key = ["feedback", feedbackValue];
  const current = await getFeedbackCount(feedbackValue);
  await kv.set(key, current + 1);
};

// Routes for feedback 1
app.get("/feedbacks/1", async (c) => {
  const count = await getFeedbackCount("1");
  return c.text(`Feedback 1: ${count}`);
});

app.post("/feedbacks/1", async (c) => {
  await incrementFeedbackCount("1");
  const count = await getFeedbackCount("1");
  return c.text(`Feedback 1: ${count}`);
});

// Routes for feedback 2
app.get("/feedbacks/2", async (c) => {
  const count = await getFeedbackCount("2");
  return c.text(`Feedback 2: ${count}`);
});

app.post("/feedbacks/2", async (c) => {
  await incrementFeedbackCount("2");
  const count = await getFeedbackCount("2");
  return c.text(`Feedback 2: ${count}`);
});

// Routes for feedback 3
app.get("/feedbacks/3", async (c) => {
  const count = await getFeedbackCount("3");
  return c.text(`Feedback 3: ${count}`);
});

app.post("/feedbacks/3", async (c) => {
  await incrementFeedbackCount("3");
  const count = await getFeedbackCount("3");
  return c.text(`Feedback 3: ${count}`);
});

export default app;
