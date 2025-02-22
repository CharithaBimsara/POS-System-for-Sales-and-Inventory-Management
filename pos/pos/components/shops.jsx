export const shops = [
    {
      id: 1,
      name: "City Painters",
      location: "Downtown",
      stock: [
        { product: "Interior Primer", currentStock: 50, distributed: 80 },
        { product: "Latex Paint", currentStock: 120, distributed: 200 },
        { product: "Gloss Enamel", currentStock: 30, distributed: 50 },
      ],
      sales: { weekly: 45, monthly: 180 },
      requests: [
        { id: 1, product: "Gloss Enamel", quantity: 40, status: "pending", priority: "high" },
        { id: 2, product: "Latex Paint", quantity: 80, status: "pending", priority: "medium" }
      ]
    },
    {
      id: 2,
      name: "Pro Decorators",
      location: "Industrial Zone",
      stock: [
        { product: "Exterior Paint", currentStock: 80, distributed: 150 },
        { product: "Wood Varnish", currentStock: 40, distributed: 60 },
        { product: "Metallic Finish", currentStock: 25, distributed: 40 },
      ],
      sales: { weekly: 32, monthly: 135 },
      requests: [
        { id: 3, product: "Exterior Paint", quantity: 50, status: "pending", priority: "medium" },
        { id: 4, product: "Wood Varnish", quantity: 30, status: "pending", priority: "low" }
      ]
    },
    {
      id: 3,
      name: "Elite Finishes",
      location: "Uptown",
      stock: [
        { product: "High Gloss Paint", currentStock: 70, distributed: 120 },
        { product: "Clear Lacquer", currentStock: 55, distributed: 90 },
        { product: "Matte Black Paint", currentStock: 40, distributed: 70 },
      ],
      sales: { weekly: 50, monthly: 200 },
      requests: [
        { id: 5, product: "High Gloss Paint", quantity: 60, status: "pending", priority: "high" },
        { id: 6, product: "Clear Lacquer", quantity: 50, status: "pending", priority: "medium" }
      ]
    }
  ];
  