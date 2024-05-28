import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock endpoint for fetching data
  http.get("/api/HomePageData", () => {
    return HttpResponse.json({
      stats: [
        { name: "Power Factor", value: "0.45" },
        { name: "Frequency", value: "50Hz" },
        { name: "RMS Voltage", value: "220V" },
        { name: "Active Power", value: "28.31 KWh" },
        { name: "Reactive Power", value: "0.5VAr" },
        { name: "Apparent Power", value: "65.60kVAh" },
      ],
      currentMap: {
        L1: 10,
        L2: 8,
        L3: 12,
        Neutral: 0,
      },
      circuitBreakerMap: {
        Breaker1: 5,
        Breaker2: 7,
        Breaker3: 9,
      },
      outletStatus: [
        { Label: "Outlet 1", Current: "3.2", Status: "success" },
        { Label: "Outlet 2", Current: "12.0", Status: "warning" },
        { Label: "Outlet 3", Current: "15.6", Status: "error" },
        { Label: "Outlet 4", Current: "3.2", Status: "success" },
        { Label: "Outlet 5", Current: "12.0", Status: "warning" },
        { Label: "Outlet 6", Current: "15.6", Status: "error" },
      ],
    });
  }),

  http.post("/api/login", async ({ request }) => {
    if (request.headers.get("Authorization").split(" ")[1] == "YWRtaW46YWRtaW4=") {
      return new HttpResponse(null, {
        headers: {
          "Set-Cookie": `session_token=1234abcd; Domain=localhost; Path=/; Expires=${new Date(
            Date.now() + 200000
          ).toUTCString()}; SameSite=None; Secure, isAuthenticated=true;Domain=localhost; Path=/; Expires=${new Date(
            Date.now() + 200000
          ).toUTCString()}; SameSite=None; Secure `,
        },
      });
    } else {
      return new HttpResponse(null, { status: 401 });
    }
  }),

  http.get("/api/logout", async ({ request }) => {
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": `session_token=; Domain=localhost; Path=/; Expires=${new Date(
          Date.now() - 200000
        ).toUTCString()}; SameSite=None; Secure, isAuthenticated=;Domain=localhost; Path=/; Expires=${new Date(
          Date.now() - 200000
        ).toUTCString()}; SameSite=None; Secure `,
      },
    });
  }),
];
