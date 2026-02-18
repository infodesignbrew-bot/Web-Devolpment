export default {
  name: "service",
  title: "Services",
  type: "document",

  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
      description: "Unique key like brand, seo, web",
      validation: Rule => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
      validation: Rule => Rule.required(),
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      validation: Rule => Rule.min(1),
    },
    {
      name: "image",
      title: "Service Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
  ],
};
