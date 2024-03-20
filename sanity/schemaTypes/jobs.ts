// your-studio/schemas/jobs.js

export default {
    name: "jobs",
    title: "Jobs",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "string",
      },
      {
        name: "location",
        title: "Location",
        type: "string",
      },
      {
        name: "company",
        title: "Company",
        type: "string",
      },
      {
        name: "type",
        title: "Type",
        type: "string",
      },
      {
        name: "salary",
        title: "Salary",
        type: "string",
      },
      {
        name: "experienceLevel",
        title: "Experience Level",
        type: "string",
      },
      {
        name: "skills",
        title: "Skills",
        type: "array",
        of: [{ type: "string" }],
      },
      {
        name: "education",
        title: "Education",
        type: "string",
      },
      {
        name: "applicationDeadline",
        title: "Application Deadline",
        type: "datetime",
      },
      {
        name: "contactInformation",
        title: "Contact Information",
        type: "string",
      },
    ],
  };
