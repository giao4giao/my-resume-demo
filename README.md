# Resume Builder

A simple and interactive resume builder that allows users to create, edit, and manage multiple resumes.

[中文版说明](README_CN.md)

## New Features (v0.0.5)

- Optimized avatar upload and display functionality for a more intuitive user experience
- Improved resume type selector, supporting seamless switching between different resume types
- Enhanced internationalization support with improved multi-language switching

## Improvements

- Optimized resume template rendering logic for more flexible template customization
- Improved `ResumeEditor` component, enhancing code maintainability and extensibility
- Optimized resume data saving and loading mechanisms for improved data consistency
- Enhanced template selector implementation, offering more diverse resume template options

## User Experience

- Optimized avatar display logic, showing avatar only after successful upload without default placeholder
- Improved editable element interaction for a more intuitive editing experience
- Enhanced notification system for timely user feedback

## Cross-platform Compatibility

- Synchronized PDF download format between mobile and desktop platforms, ensuring consistent output

## Development-related

- Restructured JavaScript files for better modularization
- Optimized communication mechanisms between components, improving code maintainability and extensibility
- Updated project documentation, including README and internationalization support
- Split long CSS files into multiple smaller files, improving style management efficiency

## Features

- Create and manage multiple resumes
- Edit resume content directly on the page
- Add and update profile picture
- Advanced editing using JSON format
- Download resume as PDF with improved page layout
- Responsive design
- Multiple resume templates and types
- Internationalization support

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

For the Chinese version of the changelog, please refer to [CHANGELOG_CN](CHANGELOG_CN.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.