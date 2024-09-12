// 存储当前正在编辑的简历ID
let currentResumeId = null;

/**
 * 更新UI语言
 * 根据当前选择的语言更新整个应用的文本内容
 */
function updateUILanguage() {
    const currentLang = localStorage.getItem('language') || 'zh';
    const translations = window.translations[currentLang];

    // 更新页面标题
    document.getElementById('page-title').textContent = translations.resumeManagementSystem;

    // 更新系统标题
    document.getElementById('system-title').textContent = translations.resumeManagementSystem;

    // 更新所有带有 data-translate 属性的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    // 重新渲染选择器
    window.addTemplateSelector();
    window.addResumeTypeSelector();

    // 更新创建新简历按钮
    const createResumeBtn = document.getElementById('create-resume-btn');
    if (createResumeBtn) {
        createResumeBtn.textContent = translations.createNewResume;
    }

    // 更新编辑器控制按钮
    updateEditorControlButtons(translations);

    // 更新高级编辑器按钮
    updateAdvancedEditorButtons(translations);

    // 更新简历列表中的按钮文本
    updateResumeListButtons(translations);

    // 更新"显示更多"按钮
    updateShowMoreButton(translations);

    // 更新语言切换按钮
    updateLanguageToggleButton(currentLang);

    // 如果有简历内容，重新渲染它
    rerenderCurrentResume();

    // 重新加载简历列表
    reloadResumeList();
}

/**
 * 更新编辑器控制按钮的文本
 * @param {Object} translations - 翻译对象
 */
function updateEditorControlButtons(translations) {
    const buttons = {
        'add-avatar-btn': 'addAvatar',
        'save-btn': 'saveChanges',
        'download-btn': 'downloadPDF',
        'back-btn': 'backToList',
        'advanced-edit-btn': 'advancedEdit'
    };

    Object.entries(buttons).forEach(([id, key]) => {
        const button = document.getElementById(id);
        if (button) button.textContent = translations[key];
    });
}

/**
 * 更新高级编辑器按钮的文本
 * @param {Object} translations - 翻译对象
 */
function updateAdvancedEditorButtons(translations) {
    const applyJsonBtn = document.getElementById('apply-json-btn');
    const cancelAdvancedEditBtn = document.getElementById('cancel-advanced-edit-btn');

    if (applyJsonBtn) applyJsonBtn.textContent = translations.applyChanges;
    if (cancelAdvancedEditBtn) cancelAdvancedEditBtn.textContent = translations.cancel;
}

/**
 * 更新简历列表中的按钮文本
 * @param {Object} translations - 翻译对象
 */
function updateResumeListButtons(translations) {
    const editButtons = document.querySelectorAll('.resume-item-buttons button:first-child');
    const deleteButtons = document.querySelectorAll('.resume-item-buttons button:last-child');

    editButtons.forEach(button => button.textContent = translations.edit);
    deleteButtons.forEach(button => button.textContent = translations.delete);
}

/**
 * 更新"显示更多"按钮的文本
 * @param {Object} translations - 翻译对象
 */
function updateShowMoreButton(translations) {
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.textContent = showMoreBtn.textContent === translations.showMore ? translations.showLess : translations.showMore;
    }
}

/**
 * 更新语言切换按钮的文本和标题
 * @param {string} currentLang - 当前语言
 */
function updateLanguageToggleButton(currentLang) {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.textContent = currentLang === 'en' ? '中' : 'En';
        languageToggle.title = currentLang === 'en' ? '切换到中文' : 'Switch to English';
    }
}

/**
 * 重新渲染当前正在编辑的简历
 */
function rerenderCurrentResume() {
    if (window.ResumeEditor && window.ResumeEditor.getCurrentResumeId()) {
        const currentResumeId = window.ResumeEditor.getCurrentResumeId();
        const currentResume = window.resumeService.getResumeById(currentResumeId);
        if (currentResume) {
            window.ResumeEditor.fillResumeContent(currentResume[currentResume.type], currentResume.template, currentResume.type);
        }
    }
}

/**
 * 重新加载简历列表
 */
function reloadResumeList() {
    if (window.resumeList && typeof window.resumeList.loadResumeList === 'function') {
        window.resumeList.loadResumeList();
    }
}

/**
 * 初始化应用
 * 这个函数在所有脚本加载完成后被调用
 */
function initApp() {
    console.log("initApp 函数被调用");

    // 初始化各个组件
    window.resumeList = window.ResumeList();
    console.log("ResumeList initialized");
    
    window.ResumeEditor.init();
    console.log("ResumeEditor initialized");

    // 加载简历列表
    window.resumeList.loadResumeList();
    console.log("Resume list loaded");

    // 添加创建新简历按钮的事件监听器
    addCreateResumeButtonListener();
    console.log("Create resume button listener added");

    // 更新UI语言
    updateUILanguage();
    console.log("UI language updated");
}

/**
 * 为创建新简历按钮添加事件监听器
 */
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

/**
 * 创建新简历
 */
function createNewResume() {
    console.log("创建新简历按钮被点击");
    const newResume = window.resumeService.createNewResume();
    window.resumeList.loadResumeList(); // 重新加载简历列表
    window.editResume(window.resumeService.getResumes().length - 1); // 编辑新创建的简历
}

/**
 * 编辑指定索引的简历
 * @param {number} index - 简历在列表中的索引
 */
window.editResume = function(index) {
    console.log("editResume 被调用，index:", index);
    const resumes = window.resumeService.getResumes();
    if (resumes[index]) {
        const currentResumeId = resumes[index].id;
        const currentResumeData = resumes[index];
        const template = currentResumeData.template || 'default';
        const resumeType = currentResumeData.type || 'mechanical';
        const resumeTypeData = currentResumeData[resumeType] || window.defaultResumeData[resumeType];
        window.ResumeEditor.setCurrentResumeId(currentResumeId);
        window.ResumeEditor.fillResumeContent(resumeTypeData, template, resumeType);
        
        // // 更新头像
        // window.ResumeEditor.updateAvatarDisplay(currentResumeData.avatar);
        
        document.getElementById('resume-manager').style.display = 'none';
        document.getElementById('resume-editor').style.display = 'block';
    } else {
        console.error("无法找到索引为 " + index + " 的简历");
    }
};

/**
 * 删除指定索引的简历
 * @param {number} index - 简历在列表中的索引
 */
window.deleteResume = function(index) {
    const resumes = window.resumeService.getResumes();
    const currentLang = localStorage.getItem('language') || 'zh';
    const translations = window.translations[currentLang];
    
    window.ConfirmDialog.show(
        translations.confirmAction,
        translations.confirmDeleteMessage,
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