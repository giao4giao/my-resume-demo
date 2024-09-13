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
            codeElement.className = 'language-json hljs';
            codeElement.textContent = jsonString;
            preElement.appendChild(codeElement);
            
            const jsonEditor = document.getElementById('json-editor');
            jsonEditor.innerHTML = '';
            jsonEditor.appendChild(preElement);
            
            // 应用语法高亮
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(codeElement);
                // 检查行号插件是否可用
                if (typeof hljs.lineNumbersBlock === 'function') {
                    hljs.lineNumbersBlock(codeElement);
                } else {
                    console.warn('Line numbers plugin is not available. Line numbers will not be added.');
                }
            } else {
                console.warn('highlight.js is not loaded. Syntax highlighting will not be applied.');
            }

            // 使 pre 元素可编辑
            preElement.contentEditable = 'true';
            preElement.style.whiteSpace = 'pre-wrap';
            preElement.style.wordWrap = 'break-word';
            preElement.classList.add('json-editor-content');
            
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
            const jsonContent = document.querySelector('#json-editor pre').textContent;
            const updatedResume = JSON.parse(jsonContent);
            const originalResume = window.resumeService.getResumeById(currentResumeId);
            
            // 检查头像数据是否被修改
            if (updatedResume[updatedResume.type] && updatedResume[updatedResume.type].avatar) {
                // 如果头像数据被修改（不是截断的版本），则使用新的头像数据
                if (!updatedResume[updatedResume.type].avatar.endsWith('...')) {
                    console.log('New avatar data detected');
                } else {
                    // 如果是截断的版本，保留原始的头像数据
                    updatedResume[updatedResume.type].avatar = originalResume[originalResume.type].avatar;
                }
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