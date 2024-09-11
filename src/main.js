// 存储当前正在编辑的简历ID
let currentResumeId = null;

function initApp() {
    console.log("initApp 函数被调用");

    // 初始化各个组件
    window.resumeList = window.ResumeList();
    console.log("ResumeList initialized");
    
    window.resumeEditor = window.ResumeEditor;
    console.log("ResumeEditor assigned");
    
    if (typeof window.resumeEditor.init === 'function') {
        window.resumeEditor.init();
        console.log("ResumeEditor initialized");
    } else {
        console.error("ResumeEditor.init is not a function");
    }

    // 加载简历列表
    window.resumeList.loadResumeList();
    console.log("Resume list loaded");

    // 添加创建新简历按钮的事件监听器
    addCreateResumeButtonListener();
    console.log("Create resume button listener added");
}

function addCreateResumeButtonListener() {
    const createResumeBtn = document.getElementById('create-resume-btn');
    if (createResumeBtn) {
        // 移除所有现有的事件监听器
        createResumeBtn.replaceWith(createResumeBtn.cloneNode(true));
        
        // 重新获取按钮并添加新的事件监听器
        const newCreateResumeBtn = document.getElementById('create-resume-btn');
        newCreateResumeBtn.addEventListener('click', createNewResume);
    } else {
        console.error('创建新简历按钮未找到');
    }
}

function createNewResume() {
    console.log("创建新简历按钮被点击");
    const newResume = window.resumeService.createNewResume();
    window.resumeList.loadResumeList(); // 重新加载简历列表
    window.editResume(window.resumeService.getResumes().length - 1); // 编辑新创建的简历
}

// 定义全局的 editResume 函数
window.editResume = function(index) {
    console.log("editResume 被调用，index:", index);
    const resumes = window.resumeService.getResumes();
    if (resumes[index]) {
        currentResumeId = resumes[index].id;
        const currentResumeData = resumes[index];
        const template = currentResumeData.template || 'default';
        const resumeType = currentResumeData.type || 'mechanical';
        const resumeTypeData = currentResumeData[resumeType] || window.defaultResumeData[resumeType];
        window.resumeEditor.setCurrentResumeId(currentResumeId);
        window.resumeEditor.fillResumeContent(resumeTypeData, template, resumeType);
        
        // 更新头像
        window.resumeEditor.updateAvatarDisplay(currentResumeData.avatar);
        
        document.getElementById('resume-manager').style.display = 'none';
        document.getElementById('resume-editor').style.display = 'block';
    } else {
        console.error("无法找到索引为 " + index + " 的简历");
    }
};

// 定义全局的删除简历函数
window.deleteResume = function(index) {
    const resumes = window.resumeService.getResumes();
    window.ConfirmDialog.show(
        '确定要删除这份简历吗？',
        () => {
            window.resumeService.deleteResume(resumes[index].id);
            window.resumeList.loadResumeList(); // 重新加载简历列表
        }
    );
};

// 当 DOM 加载完成后执行 initApp
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initApp();
});

// 添加一个 window load 事件监听器，以确保所有资源都加载完毕
window.addEventListener('load', () => {
    console.log('All resources loaded');
});