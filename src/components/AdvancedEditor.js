window.AdvancedEditor = {
    showAdvancedEditor: function(currentResumeId) {
        const currentResume = window.resumeService.getResumeById(currentResumeId);
        document.getElementById('json-editor').value = JSON.stringify(currentResume, null, 2);
        document.getElementById('resume-editor').style.display = 'none';
        document.getElementById('advanced-editor').style.display = 'block';
    },

    applyJsonChanges: function(currentResumeId) {
        try {
            const updatedResume = JSON.parse(document.getElementById('json-editor').value);
            updatedResume.id = currentResumeId; // 确保ID保持不变
            window.resumeService.saveResume(updatedResume);
            
            // 更新简历编辑器的内容
            const resumeType = updatedResume.type || 'mechanical';
            const resumeData = updatedResume[resumeType] || window.defaultResumeData[resumeType];
            window.resumeEditor.setCurrentResumeId(currentResumeId);
            window.resumeEditor.fillResumeContent(resumeData, updatedResume.template, resumeType);
            
            // 更新头像显示
            if (resumeData.avatar) {
                window.resumeEditor.updateAvatarDisplay(resumeData.avatar);
            }
            
            this.hideAdvancedEditor();
            window.showNotification('修改已应用', '简历数据已更新。');
            
            // 重新加载简历列表以反映更改
            window.resumeList.loadResumeList();
        } catch (error) {
            console.error('Error applying JSON changes:', error);
            window.showNotification('错误', 'JSON格式错误，请检查后重试。');
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