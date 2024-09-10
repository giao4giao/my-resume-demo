// 存储当前正在编辑的简历ID
let currentResumeId = null;

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各个组件
    const resumeList = window.ResumeList();
    const resumeEditor = window.ResumeEditor();
    const advancedEditor = window.AdvancedEditor();

    // 加载简历列表
    resumeList.loadResumeList();

    // 使用可选链操作符来避免空引用错误
    document.getElementById('create-resume-btn')?.addEventListener('click', window.resumeService.createNewResume);
    document.getElementById('save-btn')?.addEventListener('click', () => resumeEditor.saveCurrentResume(currentResumeId));
    document.getElementById('download-btn')?.addEventListener('click', resumeEditor.downloadPDF);
    document.getElementById('back-btn')?.addEventListener('click', showResumeList);
    document.getElementById('advanced-edit-btn')?.addEventListener('click', () => advancedEditor.showAdvancedEditor(currentResumeId));
    document.getElementById('apply-json-btn')?.addEventListener('click', () => advancedEditor.applyJsonChanges(currentResumeId));
    document.getElementById('cancel-advanced-edit-btn')?.addEventListener('click', advancedEditor.hideAdvancedEditor);
    document.getElementById('add-avatar-btn')?.addEventListener('click', resumeEditor.triggerAvatarUpload);
    document.getElementById('avatar-input')?.addEventListener('change', (event) => resumeEditor.handleAvatarUpload(event, currentResumeId));

    // 确保 editResume 函数被正确定义
    window.editResume = (index) => {
        const resumes = resumeList.getResumes();
        currentResumeId = resumes[index].id;
        resumeEditor.fillResumeContent(resumes[index]);
        document.getElementById('resume-manager').style.display = 'none';
        document.getElementById('resume-editor').style.display = 'block';
    };

    // 定义全局的删除简历函数
    window.deleteResume = resumeList.handleDeleteResume;
    // 定义全局的加载简历列表函数
    window.loadResumeList = resumeList.loadResumeList;
});

// 显示简历列表
function showResumeList() {
    document.getElementById('resume-manager').style.display = 'block';
    document.getElementById('resume-editor').style.display = 'none';
    document.getElementById('advanced-editor').style.display = 'none';
    window.loadResumeList();
}