# Resume Builder

A simple and interactive resume builder that allows users to create, edit, and manage multiple resumes.

[中文版说明](README_CN.md)

## New Features (v0.0.4)

- Advanced editing mode supporting direct JSON format editing
- Resume type selector for switching between different resume types (e.g., mechanical, software, marketing)
- Confirmation dialog component for improved operation safety

## Improvements

- Optimized resume editor structure and functionality for better maintainability
- Enhanced template selector implementation for more flexibility and extensibility
- Improved resume list management and display logic
- Enhanced avatar upload and display functionality with real-time preview and updates
- Optimized PDF generation for improved efficiency and output quality

## User Experience

- Added scroll listener for optimized editor control panel display
- Improved editable element interaction for more intuitive editing experience
- Enhanced notification system for timely user feedback

## Style and Layout

- Updated resume template styles with more diverse design options
- Optimized responsive layout for better display across different devices
- Improved editor and management interface styles for enhanced visual experience

## Features

- Create and manage multiple resumes
- Edit resume content directly on the page
- Add and update profile picture
- Advanced editing using JSON format
- Download resume as PDF with improved page layout
- Responsive design
- Multiple resume templates and types

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
7. Save your changes using the "Save Changes" button.
8. Download your resume as a PDF using the "Download PDF" button.

## Recent Updates

For a full list of changes, please see the [CHANGELOG](CHANGELOG.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.