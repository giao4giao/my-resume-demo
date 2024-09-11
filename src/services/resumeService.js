function getResumes() {
    return JSON.parse(localStorage.getItem('resumes')) || [];
}

function saveResumes(resumes) {
    try {
        localStorage.setItem('resumes', JSON.stringify(resumes));
    } catch (error) {
        console.error('保存简历失败:', error);
        alert('保存简历失败，可能是由于存储空间不足。请尝试删除一些旧的简历或减小头像图片的大小。');
    }
}

function getResumeById(id) {
    const resumes = getResumes();
    return resumes.find(r => r.id === id);
}

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

function deleteResume(id) {
    const resumes = getResumes();
    const updatedResumes = resumes.filter(r => r.id !== id);
    saveResumes(updatedResumes);
}

function createNewResume() {
    console.log("创建新简历函数被调用");
    const resumes = getResumes();
    const newResume = JSON.parse(JSON.stringify(window.defaultResumeData));
    newResume.id = Date.now();
    newResume.name = newResume.name || "新简历";
    newResume.title = newResume.title || "职位未设置";
    newResume.template = "default";
    resumes.push(newResume);
    saveResumes(resumes);
    window.loadResumeList();
    console.log("新简历已创建:", newResume);
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