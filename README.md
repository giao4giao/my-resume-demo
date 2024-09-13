# Resume Builder

A simple and interactive resume builder that allows users to create, edit, and manage multiple resumes.

[中文版说明](./docs/README_CN.md)

## New Features (v0.0.6)

- Added a self-evaluation field to enrich resume content
- Improved default prompt text for empty fields, enhancing user experience
- Optimized text box style for a better editing experience
- Enhanced PDF generation to ensure consistency with preview

## Improvements

- Optimized resume template rendering logic for more flexible customization
- Improved the editing experience for education background and professional skills sections
- Enhanced avatar addition functionality with increased stability
- Updated translation files for better multi-language support
- Optimized default resume data structure

## Features

- Create and manage multiple resumes
- Edit resume content directly on the page
- Add and update profile picture
- Advanced editing using JSON format
- Download resume as PDF with improved layout
- Responsive design
- Multiple resume templates and types
- Internationalization support
- Self-evaluation section

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Local web server (e.g., Node.js with http-server, Python's SimpleHTTPServer, or VS Code's Live Server extension)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/giao4giao/my-resume-demo.git
   ```

2. Navigate to the project directory:
   ```
   cd my-resume-demo
   ```

3. Set up a local web server. For example, if you have Node.js installed, you can use http-server:
   ```
   npx http-server
   ```
   Or if you're using Python:
   ```
   python -m http.server
   ```

4. Open your browser and navigate to `http://localhost:8080` (or the port your server is running on).

Note: Due to the project structure, opening `index.html` directly in a browser won't work. You must use a web server to run the application correctly.

## Usage

1. Click "Create New Resume" to start a new resume.
2. Choose a template from the template selector.
3. Select a resume type from the resume type selector.
4. Edit the resume content by clicking on the text fields.
5. Add or update the profile picture using the "Add/Change Avatar" button.
6. Use the "Advanced Edit" button to modify the resume in JSON format.
7. Add your self-evaluation in the dedicated section.
8. Save your changes using the "Save Changes" button.
9. Download your resume as a PDF using the "Download PDF" button.

## Recent Updates

For a full list of changes, please see the [CHANGELOG](CHANGELOG.md).

For the Chinese version of the changelog, please refer to [CHANGELOG_CN](./docs/CHANGELOG_CN.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.