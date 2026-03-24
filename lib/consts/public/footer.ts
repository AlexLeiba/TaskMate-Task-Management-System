export const FOOTER_TABS_LINKS = [
  {
    label: "About Taskmate",
    description:
      "Learn more about Taskmate project in About section of Top navigation menu ",
    path: "#header",
  },
  {
    label: "Features",
    description: "Check out The Features of Taskmate in the Features section",
    path: "#all-features",
  },
  {
    label: "Contact us",
    description:
      "Contact us via: Gmail Linkedin or Github which can be found below",
    path: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
  },
];
