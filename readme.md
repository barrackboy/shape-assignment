# Listing and Filtering Demo

This demo showcases a simple and effective way to list and filter items using HTML, CSS, and JavaScript. It can easily be adapted into a HubSpot module, making it a versatile solution for various use cases.

## Included Files

- **`style.css`**: Contains the styling for the demo, ensuring a responsive and visually appealing interface.
- **`data.json`**: A mock data file simulating an API endpoint, providing a feed of articles to be listed and filtered.
- **`index.html`**: The main HTML file that structures the content and integrates the styling and data.

## Demo Routes

You can view the application on your local machine via localhost, or you can test it easily on any device type using this link: [Demo on Vercel](https://shape-seven.vercel.app/).

## Considerations

- **HubSpot Module Integration**: This demo is designed to be easily integrated into a HubSpot module, allowing for the listing and filtering of items as needed. The mock data simulates an API endpoint with an article listing feed, which is parsed and displayed using JavaScript.

- **HUBL Compatibility**: If the data feed comes from within the HubSpot infrastructure (such as blogs or HubDB), HUBL can be injected to fetch and manage the data. This makes it possible to turn this demo into a robust, reusable custom module that can be deployed site-wide.

- **Scope Limitations**:
  - **Navigation and Footer**: The menu navigation and footer are not included in this demo as they are assumed to be global modules and are outside the scope of this project.
  - **Anchor Tags**: Indexed elements are not wrapped in anchor tags since there is no associated post page to link them to. This is also beyond the scope of this demo.

- **Design Choices**:
  - The "Filter:" text has been omitted to maintain a cleaner and more consistent interface.
  - Multiple tags are assigned to each article, reflecting common practices in blogs where articles often have more than one associated tag.

- **Responsiveness**: This demo is fully responsive, allowing for all filtering operations to be performed on any device without requiring a browser refresh.

- **Filter Reset Capability**: "All Topics" and "All Formats" options are included for clarity, allowing users to easily reset filters during their interaction with the application.

## Getting Started

To run this demo locally:

1. Open `index.html` in your browser to view the demo.

## Future Enhancements

- **Linking Articles**: Future iterations could include wrapping indexed elements in anchor tags, linking them to individual post pages.
- **HubSpot Integration**: Further development could involve integrating this demo directly into a HubSpot environment, using HUBL to fetch and manage real-time data. Lazy loading for images can also be facilitated by HUBL.







