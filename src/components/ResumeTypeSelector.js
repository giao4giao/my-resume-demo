window.addResumeTypeSelector = function() {
    const selectorContainer = document.getElementById('selector-container');
    if (!selectorContainer) {
        console.error('selector-container element not found');
        return;
    }

    // 检查是否已经存在简历类型选择器
    if (!document.getElementById('resume-type-selector')) {
        const selectorHtml = `
            <div class="selector-item">
                <label for="resume-type-selector">简历类型:</label>
                <select id="resume-type-selector" class="styled-select">
                    ${Object.keys(window.defaultResumeData).map(key => 
                        `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</option>`
                    ).join('')}
                </select>
            </div>
        `;
        selectorContainer.insertAdjacentHTML('beforeend', selectorHtml);
        
        document.getElementById('resume-type-selector').addEventListener('change', function(e) {
            const selectedResumeType = e.target.value;
            if (window.resumeEditor && typeof window.resumeEditor.updateResumeType === 'function') {
                window.resumeEditor.updateResumeType(selectedResumeType);
            } else {
                console.error('ResumeEditor or updateResumeType method not found');
            }
        });
    }
};