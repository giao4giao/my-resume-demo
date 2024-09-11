window.addTemplateSelector = function() {
    const selectorContainer = document.getElementById('selector-container');
    if (!selectorContainer) {
        console.error('selector-container element not found');
        return;
    }

    // 检查是否已经存在模板选择器
    if (!document.getElementById('template-selector')) {
        const selectorHtml = `
            <div class="selector-item">
                <label for="template-selector">模板:</label>
                <select id="template-selector" class="styled-select">
                    ${Object.keys(window.resumeTemplates).map(key => 
                        `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</option>`
                    ).join('')}
                </select>
            </div>
        `;
        selectorContainer.insertAdjacentHTML('beforeend', selectorHtml);
        
        document.getElementById('template-selector').addEventListener('change', function(e) {
            const selectedTemplate = e.target.value;
            if (window.resumeEditor && typeof window.resumeEditor.updateTemplate === 'function') {
                window.resumeEditor.updateTemplate(selectedTemplate);
            } else {
                console.error('ResumeEditor or updateTemplate method not found');
            }
        });
    }
};