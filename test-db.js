import { createClient } from '@libsql/client';

const TURSO_URL = "libsql://adsense-blog-dhruvkhambhata.aws-ap-south-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2OTQ4ODIsImlkIjoiMDE5ZGFiM2YtNzkwMS03ZmJmLTgyY2ItN2Q4YmFkN2Y1YTkwIiwicmlkIjoiYzliYmI0ZGMtNzY0MC00NjVjLWE0OWUtZGE3NjRhY2I5NjY3In0.7uQuYkLTVTrHfs_bL8FUEdxS7YgNh9t5xy-LwQGBUrD0vevKn1HM6kfky0fOtnEKYyWhzhVDilnPSHT0Ec1WBA";

console.log("TESTING TURSO CONNECTION...");
try {
  const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });
  console.log("CLIENT CREATED SUCCESSFULLY");
  // Try a simple query
  const res = await client.execute("SELECT 1");
  console.log("QUERY SUCCESSFUL:", res);
} catch (err) {
  console.error("TEST FAILED:", err);
}
