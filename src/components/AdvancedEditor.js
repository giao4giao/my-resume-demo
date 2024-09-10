function AdvancedEditor() {
    // 显示高级编辑器界面
    function showAdvancedEditor(currentResumeId) {
        const currentResume = window.resumeService.getResumeById(currentResumeId);
        document.getElementById('json-editor').value = JSON.stringify(currentResume, null, 2);
        document.getElementById('resume-editor').style.display = 'none';
        document.getElementById('advanced-editor').style.display = 'block';
    }

    // 应用JSON编辑器中的更改
    function applyJsonChanges(currentResumeId) {
        try {
            const updatedResume = JSON.parse(document.getElementById('json-editor').value);
            updatedResume.id = currentResumeId; // 确保ID保持不变
            window.resumeService.saveResume(updatedResume);
            window.ResumeEditor().fillResumeContent(updatedResume);
            hideAdvancedEditor();
            alert('修改已应用');
        } catch (error) {
            alert('JSON格式错误，请检查后重试');
        }
    }

    // 隐藏高级编辑器界面
    function hideAdvancedEditor() {
        document.getElementById('resume-editor').style.display = 'block';
        document.getElementById('advanced-editor').style.display = 'none';
    }

    // 返回公共方法
    return {
        showAdvancedEditor,
        applyJsonChanges,
        hideAdvancedEditor
    };
}

// 将AdvancedEditor暴露到全局作用域
window.AdvancedEditor = AdvancedEditor;