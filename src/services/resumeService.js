/**
 * 获取所有保存的简历
 * @returns {Array} 简历对象数组
 */
function getResumes() {
    return JSON.parse(localStorage.getItem('resumes')) || [];
}

/**
 * 保存简历数组到本地存储
 * @param {Array} resumes - 要保存的简历对象数组
 */
function saveResumes(resumes) {
    try {
        localStorage.setItem('resumes', JSON.stringify(resumes));
    } catch (error) {
        console.error('保存简历失败:', error);
        alert('保存简历失败，可能是由于存储空间不足。请尝试删除一些旧的简历或减小头像图片的大小。');
    }
}

/**
 * 根据ID获取特定的简历
 * @param {string|number} id - 简历的唯一标识符
 * @returns {Object|undefined} 找到的简历对象，如果未找到则返回 undefined
 */
function getResumeById(id) {
    const resumes = getResumes();
    return resumes.find(r => r.id === id);
}

/**
 * 保存单个简历
 * 如果简历已存在则更新，否则添加新简历
 * @param {Object} resume - 要保存的简历对象
 */
function saveResume(resume) {
    const resumes = getResumes();
    const index = resumes.findIndex(r => r.id === resume.id);
    if (index !== -1) {
        resumes[index] = resume;
    } else {
        resumes.push(resume);
    }
    saveResumes(resumes);
}

/**
 * 删除指定ID的简历
 * @param {string|number} id - 要删除的简历的唯一标识符
 */
function deleteResume(id) {
    const resumes = getResumes();
    const updatedResumes = resumes.filter(r => r.id !== id);
    saveResumes(updatedResumes);
}

/**
 * 创建新简历
 * @returns {Object} 新创建的简历对象
 */
function createNewResume() {
    console.log("创建新简历函数被调用");
    const resumes = getResumes();
    const currentLang = localStorage.getItem('language') || 'zh';
    const defaultData = window.defaultResumeData && window.defaultResumeData.mechanical
        ? JSON.parse(JSON.stringify(window.defaultResumeData.mechanical))
        : {};
    const newResume = {
        id: Date.now(),
        name: currentLang === 'zh' ? "新简历" : "New Resume",
        // title: defaultData.title || (currentLang === 'zh' ? "职位未设置" : "Position not set"),
        title: currentLang === 'zh' ? "职位未设置" : "Position not set",
        template: "default",
        type: "mechanical",
        mechanical: defaultData
    };
    resumes.push(newResume);
    saveResumes(resumes);
    console.log("新简历已创建:", newResume);
    return newResume;
}

// 将函数暴露到全局作用域
window.resumeService = {
    getResumes,
    saveResumes,
    getResumeById,
    saveResume,
    deleteResume,
    createNewResume
};