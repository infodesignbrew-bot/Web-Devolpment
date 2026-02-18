export default {
  name: "testimonial",
  title: "Testimonials",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "company",
      title: "Company",
      type: "string"
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: Rule => Rule.required()
    }
  ]
};
