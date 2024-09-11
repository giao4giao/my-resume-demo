# Resume Builder

A simple and interactive resume builder that allows users to create, edit, and manage multiple resumes.

[中文版说明](README_CN.md)

## New Features (v0.0.3)

- Multiple resume templates with a template selector
- Advanced editing mode supporting JSON format
- Notification modal for better user feedback
- Internationalization support with Chinese and English README files

## Improvements

- Optimized project structure for better maintainability
- Refactored JavaScript files for modular functionality
- Enhanced PDF generation, resolving cross-page content issues
- Improved resume editing interface with more editable fields
- Enhanced resume data management with default resume data structure

## Features

- Create and manage multiple resumes
- Edit resume content directly on the page
- Add and update profile picture
- Advanced editing using JSON format
- Download resume as PDF with improved page layout
- Responsive design
- Multiple resume templates

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
3. Edit the resume content by clicking on the text fields.
4. Add or update the profile picture using the "Add/Change Avatar" button.
5. Use the "Advanced Edit" button to modify the resume in JSON format.
6. Save your changes using the "Save Changes" button.
7. Download your resume as a PDF using the "Download PDF" button.

## Recent Updates

For a full list of changes, please see the [CHANGELOG](CHANGELOG.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.