window.addTemplateSelector = function() {
    const selectorContainer = document.getElementById('selector-container');
    if (!selectorContainer) {
        console.error('selector-container element not found');
        return;
    }

    // 检查是否已经存在模板选择器
    if (!document.getElementById('template-selector')) {
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];
        const selectorHtml = `
            <div class="selector-item">
                <label for="template-selector">${translations.templateSelector}</label>
                <select id="template-selector" class="styled-select">
                    <option value="default">${translations.defaultTemplate}</option>
                    <option value="modern">${translations.modernTemplate}</option>
                    <option value="classic">${translations.classicTemplate}</option>
                    <option value="creative">${translations.creativeTemplate}</option>
                    <option value="minimalist">${translations.minimalistTemplate}</option>
                    <option value="professional">${translations.professionalTemplate}</option>
                    <option value="elegant">${translations.elegantTemplate}</option>
                </select>
            </div>
        `;
        selectorContainer.insertAdjacentHTML('beforeend', selectorHtml);
        
        document.getElementById('template-selector').addEventListener('change', function(e) {
            const selectedTemplate = e.target.value;
            console.log("Template changed to:", selectedTemplate);
            if (window.ResumeEditor && typeof window.ResumeEditor.updateTemplate === 'function') {
                window.ResumeEditor.updateTemplate(selectedTemplate);
            } else {
                console.error('ResumeEditor or updateTemplate method not found');
            }
        });
    }
};