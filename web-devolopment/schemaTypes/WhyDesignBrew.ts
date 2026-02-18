export default {
  name: "faq",
  title: "Why Design Brew FAQ",
  type: "document",

  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      validation: Rule => Rule.required(),
    },
  ],
};
