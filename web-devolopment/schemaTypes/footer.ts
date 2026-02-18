export default {
  name: "footer",
  title: "Footer",
  type: "document",

  fields: [
    {
      name: "contact",
      title: "Contact Info",
      type: "object",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Address", type: "text", rows: 2 },
        { name: "mapLink", title: "Google Map Link", type: "url" },
      ],
    },
  ],
};
