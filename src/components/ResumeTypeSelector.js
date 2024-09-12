window.addResumeTypeSelector = function() {
    const selectorContainer = document.getElementById('selector-container');
    if (!selectorContainer) {
        console.error('selector-container element not found');
        return;
    }

    // 检查是否已经存在简历类型选择器
    if (!document.getElementById('resume-type-selector')) {
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];
        const selectorHtml = `
            <div class="selector-item">
                <label for="resume-type-selector">${translations.resumeTypeSelector}</label>
                <select id="resume-type-selector" class="styled-select">
                    <option value="mechanical">${translations.mechanical}</option>
                    <option value="software">${translations.software}</option>
                    <option value="marketing">${translations.marketing}</option>
                    <option value="electrical">${translations.electrical}</option>
                    <option value="finance">${translations.finance}</option>
                </select>
            </div>
        `;
        selectorContainer.insertAdjacentHTML('beforeend', selectorHtml);
        
        document.getElementById('resume-type-selector').addEventListener('change', function(e) {
            const selectedResumeType = e.target.value;
            if (window.ResumeEditor && typeof window.ResumeEditor.updateResumeType === 'function') {
                window.ResumeEditor.updateResumeType(selectedResumeType);
            } else {
                console.error('ResumeEditor or updateResumeType method not found');
            }
        });
    }
};