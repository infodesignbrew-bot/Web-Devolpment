export default {
  name: "blog",
  title: "Blog",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "date",
      title: "Published Date",
      type: "date",
      validation: Rule => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: Rule => Rule.required(),
    },
  ],
};
