# Changelog

## v0.0.6

### Improvements
- Optimized resume template rendering logic, enhancing template flexibility and customization
- Improved default prompt text for empty fields, making the user experience more intuitive
- Enhanced the display logic for the professional skills section, showing a more user-friendly prompt when skills are empty
- Added a self-evaluation field, enriching the resume content
- Optimized the text box style when editing text, improving the editing experience

### User Experience
- Improved the editing experience for the education background section, adding appropriate prompt text for empty education time and GPA fields
- Enhanced the editing experience for the professional skills section, displaying "Please add professional skills" when empty
- Improved the avatar addition functionality, fixing related bugs and increasing stability

### PDF Generation
- Fixed issues with missing styles in PDF generation, ensuring the generated PDF matches the preview

### Internationalization
- Updated translation files, adding new translation items to improve multi-language support completeness
- Adjusted the positions of CHANGELOG_CN and README_CN files, optimizing the project structure

### Development-related
- Optimized the default resume data structure to ensure consistency with the latest template rendering logic
- Fixed some issues in the advanced editing mode, improving the accuracy and reliability of data editing

### Fixes
- Resolved issues where some fields might display incorrect default text when empty
- Fixed several bugs in the avatar addition process, improving feature stability
- Addressed data synchronization and display issues in the advanced editing mode

## v0.0.5

### New Features
- Optimized avatar upload and display functionality for a more intuitive user experience
- Improved resume type selector, supporting seamless switching between different resume types
- Enhanced internationalization support with improved multi-language switching

### Improvements
- Optimized resume template rendering logic for more flexible template customization
- Improved `ResumeEditor` component, enhancing code maintainability and extensibility
- Optimized resume data saving and loading mechanisms for improved data consistency
- Enhanced template selector implementation, offering more diverse resume template options

### User Experience
- Optimized avatar display logic, showing avatar only after successful upload without default placeholder
- Improved editable element interaction for a more intuitive editing experience
- Enhanced notification system for timely user feedback

### Cross-platform Compatibility
- Synchronized PDF download format between mobile and desktop platforms, ensuring consistent output

### Development-related
- Restructured JavaScript files for better modularization
- Optimized communication mechanisms between components, improving code maintainability and extensibility
- Updated project documentation, including README and internationalization support
- Split long CSS files into multiple smaller files, improving style management efficiency

### Fixes
- Resolved potential data loss issues when switching resume types
- Fixed display anomalies that may occur during template switching

### Style and Layout
- Updated resume template styles, providing more diverse design options
- Optimized responsive layout, improving display on different devices
- Improved style organization and maintainability by splitting CSS files

## v0.0.4

### New Features
- Implemented advanced editing mode, supporting direct JSON format editing of resume data
- Added resume type selector, supporting switching between different resume types (e.g., mechanical, software, marketing)
- Introduced confirmation dialog component for improved operation safety

### Improvements
- Optimized resume editor structure and functionality for better maintainability
- Enhanced template selector implementation for more flexibility and extensibility
- Improved resume list management and display logic
- Enhanced avatar upload and display functionality with real-time preview and updates
- Optimized PDF generation for improved efficiency and output quality

### User Experience
- Added scroll listener for optimized editor control panel display
- Improved editable element interaction for more intuitive editing experience
- Enhanced notification system for timely user feedback

### Style and Layout
- Updated resume template styles with more diverse design options
- Optimized responsive layout for better display across different devices
- Improved editor and management interface styles for enhanced visual experience

### Development-related
- Restructured JavaScript files for better modularization
- Optimized resource loading strategy, improving application loading speed
- Updated project documentation, including README and internationalization support

### Fixes
- Resolved multiple bugs related to data saving and loading
- Fixed display issues that may occur during template switching
- Resolved data synchronization issues in advanced editing mode

## v0.0.3

### New Features
- Introduced multiple resume templates and added template selector
- Added advanced editing mode, supporting JSON format resume editing
- Added notification modal for better user feedback
- Implemented internationalization support, adding Chinese and English README files

### Improvements
- Optimized project structure for better code maintainability
- Refactored JavaScript files for functional modularization
- Improved PDF generation functionality, resolving cross-page content issues
- Enhanced resume editing interface, adding more editable fields
- Improved resume data management, adding default resume data structure

### Development-related
- Updated .gitignore file for optimized version control
- Improved GitHub Actions workflow for optimized automatic release process

## v0.0.2

- Optimized PDF generation functionality, resolving content pagination issues
- Improved `pdfGenerator.js` file, enhancing PDF generation stability
- Removed page spacing settings, allowing content to naturally separate between pages
- Optimized canvas to PDF conversion process
- Refactored project structure, modularizing features for improved maintainability
- Added advanced editing functionality, supporting JSON format resume editing
- Improved resume list management functionality
- Enhanced resume editing interface, providing a more intuitive editing experience

## v0.0.1

- Initial version release
- Added basic resume HTML structure
- Created foundational CSS styles
- Implemented simple JavaScript functionality
- Set up GitHub Actions automatic release workflow
