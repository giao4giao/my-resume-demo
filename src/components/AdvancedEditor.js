window.AdvancedEditor = {
    showAdvancedEditor: function(currentResumeId) {
        const currentResume = window.resumeService.getResumeById(currentResumeId);
        if (currentResume) {
            const currentLang = localStorage.getItem('language') || 'zh';
            const translations = window.translations[currentLang];

            // 创建一个深拷贝，以避免修改原始对象
            const resumeCopy = JSON.parse(JSON.stringify(currentResume));
            // 如果头像数据太长，可以截断它以提高性能
            if (resumeCopy[resumeCopy.type] && resumeCopy[resumeCopy.type].avatar) {
                resumeCopy[resumeCopy.type].avatar = resumeCopy[resumeCopy.type].avatar.substring(0, 100) + '...';
            }
            const jsonString = JSON.stringify(resumeCopy, null, 2);
            
            // 创建一个 pre 和 code 元素来包裹 JSON 字符串
            const preElement = document.createElement('pre');
            const codeElement = document.createElement('code');
            codeElement.className = 'language-json';
            codeElement.textContent = jsonString;
            preElement.appendChild(codeElement);
            
            const jsonEditor = document.getElementById('json-editor');
            jsonEditor.innerHTML = '';
            jsonEditor.appendChild(preElement);
            
            // 应用语法高亮
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(codeElement);
            } else {
                console.warn('highlight.js is not loaded. Syntax highlighting will not be applied.');
            }
            
            // 更新高级编辑器标题
            const advancedEditorTitle = document.querySelector('.advanced-editor-container h2');
            if (advancedEditorTitle) {
                advancedEditorTitle.textContent = translations.advancedEdit;
            }

            // 更新按钮文本
            const applyButton = document.getElementById('apply-json-btn');
            const cancelButton = document.getElementById('cancel-advanced-edit-btn');
            if (applyButton) applyButton.textContent = translations.applyChanges;
            if (cancelButton) cancelButton.textContent = translations.cancel;

            document.getElementById('resume-editor').style.display = 'none';
            document.getElementById('advanced-editor').style.display = 'block';

            // 添加事件监听器
            this.addEventListeners(currentResumeId);
        } else {
            console.error('Resume not found for id:', currentResumeId);
        }
    },

    addEventListeners: function(currentResumeId) {
        const applyButton = document.getElementById('apply-json-btn');
        const cancelButton = document.getElementById('cancel-advanced-edit-btn');

        if (applyButton) {
            applyButton.onclick = () => this.applyJsonChanges(currentResumeId);
        } else {
            console.error('Apply changes button not found');
        }

        if (cancelButton) {
            cancelButton.onclick = () => this.cancelEdit();
        } else {
            console.error('Cancel button not found');
        }
    },

    applyJsonChanges: function(currentResumeId) {
        console.log('Applying JSON changes');
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];

        try {
            const jsonContent = document.querySelector('#json-editor code').textContent;
            const updatedResume = JSON.parse(jsonContent);
            const originalResume = window.resumeService.getResumeById(currentResumeId);
            
            // 保留原始的头像数据
            if (originalResume[originalResume.type] && originalResume[originalResume.type].avatar) {
                updatedResume[updatedResume.type].avatar = originalResume[originalResume.type].avatar;
            }
            
            updatedResume.id = currentResumeId; // 确保ID保持不变
            window.resumeService.saveResume(updatedResume);
            
            // 更新简历编辑器的内容
            const resumeType = updatedResume.type || 'mechanical';
            const resumeData = updatedResume[resumeType] || window.defaultResumeData[resumeType];
            window.ResumeEditor.setCurrentResumeId(currentResumeId);
            window.ResumeEditor.fillResumeContent(resumeData, updatedResume.template, resumeType);
            
            // 更新头像显示
            if (resumeData && resumeData.avatar) {
                window.ResumeEditor.updateAvatarDisplay(resumeData.avatar);
            }
            
            this.hideAdvancedEditor();
            window.showNotification(translations.changesApplied, translations.resumeDataUpdated);
            
            // 重新加载简历列表以反映更改
            window.resumeList.loadResumeList();
        } catch (error) {
            console.error('Error applying JSON changes:', error);
            window.showNotification(translations.error, translations.jsonParseError);
        }
    },

    hideAdvancedEditor: function() {
        document.getElementById('resume-editor').style.display = 'block';
        document.getElementById('advanced-editor').style.display = 'none';
    },

    cancelEdit: function() {
        this.hideAdvancedEditor();
    }
};