import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("Should display validation erros", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should validate that the price is greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Product 0",
      price: 0,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should validate that the price is and number and greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Product 0",
      price: "hola",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Product 1",
      price: 100,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(200);
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products", () => {
  it("Should check if api/products url exists", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toBe(400);
  });

  it("Get a JSON response with products", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products/:id", () => {
  it("Should return a 404 response for a non-exit product", async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado.");
  });

  it("Should check a valid ID in the url", async () => {
    const res = await request(server).get("/api/products/not-valid-url");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("El id debe ser numerico");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Get a JSON respons for a single product", async () => {
    const res = await request(server).get("/api/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("Should check a valid ID in the url", async () => {
    const res = await request(server).put("/api/products/not-valid-url").send({
      name: "Product 1 - Updated",
      price: 10,
      availability: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("El id debe ser numerico");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should display validation erros", async () => {
    const res = await request(server).put("/api/products/1").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should validate that the price is greater than 0", async () => {
    const res = await request(server).put("/api/products/1").send({
      name: "Product 1 - Updated",
      price: 0,
      availability: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("El precio debe ser mayor a 0");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should return a 404 response fora non-existent product", async () => {
    const productId = 2000;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Product 1 - Updated",
      price: 100,
      availability: true,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado.");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should update an existing product with valid data", async () => {
    const res = await request(server).put(`/api/products/1`).send({
      name: "Product 1 - Updated",
      price: 100,
      availability: true,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("PUT /api/products/:id", () => {
  it("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const res = await request(server).patch(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado.");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should update the availability of an existing product", async () => {
    const res = await request(server).patch(`/api/products/1`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/products/:id", () => {
  it("Should check a valid ID in the url", async () => {
    const res = await request(server).delete("/api/products/not-valid-url");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("El id debe ser numerico");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const res = await request(server).delete(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto no encontrado.");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should delete an existing product", async () => {
    const res = await request(server).delete(`/api/products/1`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("Producto eliminado.");

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});
