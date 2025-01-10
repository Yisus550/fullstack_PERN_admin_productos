import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openaip: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API oparations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / Sequelize / PostgreSQL / TypeScript",
      version: "1.0.0",
      description: "A REST API for a simple store",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
